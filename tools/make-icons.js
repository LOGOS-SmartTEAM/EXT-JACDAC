// Generates the extension images without external dependencies:
//   icons.jres  -> block images (namespace fifaIcons)
//   icon.png    -> 300x200 gallery card
// Usage: node tools/make-icons.js
const fs = require("fs")
const path = require("path")
const zlib = require("zlib")

const ROOT = path.join(__dirname, "..")
const SS = 4 // supersampling per axis for anti-aliasing

function crc32(buf) {
    let c, crc = 0xffffffff
    for (let n = 0; n < buf.length; n++) {
        c = (crc ^ buf[n]) & 0xff
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        crc = (crc >>> 8) ^ c
    }
    return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const td = Buffer.concat([Buffer.from(type, "ascii"), data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(td))
    return Buffer.concat([len, td, crc])
}

function encodePng(w, h, rgba) {
    const raw = Buffer.alloc((w * 4 + 1) * h)
    for (let y = 0; y < h; y++) {
        raw[y * (w * 4 + 1)] = 0
        rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4)
    }
    const ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(w, 0)
    ihdr.writeUInt32BE(h, 4)
    ihdr[8] = 8 // bit depth
    ihdr[9] = 6 // RGBA
    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", ihdr),
        chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
        chunk("IEND", Buffer.alloc(0)),
    ])
}

// shade(x, y) returns [r, g, b, a] (0..255) for a point in pixel units
function render(w, h, shade) {
    const out = Buffer.alloc(w * h * 4)
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            let r = 0, g = 0, b = 0, a = 0
            for (let sy = 0; sy < SS; sy++)
                for (let sx = 0; sx < SS; sx++) {
                    const c = shade(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS)
                    const ca = c[3] / 255
                    r += c[0] * ca
                    g += c[1] * ca
                    b += c[2] * ca
                    a += ca
                }
            const i = (y * w + x) * 4
            out[i] = a ? Math.round(r / a) : 0
            out[i + 1] = a ? Math.round(g / a) : 0
            out[i + 2] = a ? Math.round(b / a) : 0
            out[i + 3] = Math.round((a / (SS * SS)) * 255)
        }
    return out
}

function insidePolygon(px, py, pts) {
    let inside = false
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const [xi, yi] = pts[i], [xj, yj] = pts[j]
        if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)
            inside = !inside
    }
    return inside
}

function pentagon(cx, cy, r, rot) {
    const pts = []
    for (let k = 0; k < 5; k++) {
        const a = rot + (k * 2 * Math.PI) / 5
        pts.push([cx + r * Math.sin(a), cy - r * Math.cos(a)])
    }
    return pts
}

// Classic black-and-white football centred at (cx, cy) with radius R.
// Returns a color or null when the point is outside the ball.
function ball(x, y, cx, cy, R) {
    const dx = x - cx, dy = y - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d > R) return null
    const BLACK = [20, 20, 20, 255]
    if (d > R * 0.94) return BLACK // outline
    if (insidePolygon(x, y, pentagon(cx, cy, R * 0.3, 0))) return BLACK
    for (let k = 0; k < 5; k++) {
        const a = Math.PI / 5 + (k * 2 * Math.PI) / 5
        const pc = [cx + R * 0.98 * Math.sin(a), cy - R * 0.98 * Math.cos(a)]
        if (insidePolygon(x, y, pentagon(pc[0], pc[1], R * 0.3, a))) return BLACK
    }
    // seams: from each centre-pentagon corner outwards, and between outer patches
    for (let k = 0; k < 5; k++) {
        const a = (k * 2 * Math.PI) / 5
        const ux = Math.sin(a), uy = -Math.cos(a)
        const t = dx * ux + dy * uy
        const perp = Math.abs(dx * uy - dy * ux)
        if (t > R * 0.28 && t < R * 0.94 && perp < R * 0.03) return BLACK
    }
    return [250, 250, 250, 255]
}

function ballIcon(size) {
    const c = size / 2
    return render(size, size, (x, y) => ball(x, y, c, c, size * 0.47) || [0, 0, 0, 0])
}

function galleryCard() {
    const W = 300, H = 200
    return render(W, H, (x, y) => {
        const b = ball(x, y, W / 2, H / 2, 46)
        if (b) return b
        const WHITE = [255, 255, 255, 255]
        // pitch lines: border, halfway line, centre circle
        if (x < 10 || x > W - 10 || y < 10 || y > H - 10) {
            if (x > 6 && x < W - 6 && y > 6 && y < H - 6) return WHITE
        }
        if (Math.abs(x - W / 2) < 2) return WHITE
        const d = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2)
        if (Math.abs(d - 62) < 2) return WHITE
        // goal areas
        if ((x > 8 && x < 40) || (x > W - 40 && x < W - 8)) {
            const onBox =
                (Math.abs(y - 60) < 2 || Math.abs(y - (H - 60)) < 2) ||
                ((Math.abs(x - 40) < 2 || Math.abs(x - (W - 40)) < 2) && y > 60 && y < H - 60)
            if (onBox) return WHITE
        }
        // mowed grass stripes
        const stripe = Math.floor(x / 30) % 2
        return stripe ? [46, 125, 50, 255] : [56, 142, 60, 255]
    })
}

const dataUri = png => "data:image/png;base64," + png.toString("base64")

const jres = {
    "*": { namespace: "fifaIcons", dataEncoding: "base64" },
    ball: { icon: dataUri(encodePng(64, 64, ballIcon(64))) },
}
fs.writeFileSync(path.join(ROOT, "icons.jres"), JSON.stringify(jres, null, 2) + "\n")
fs.writeFileSync(path.join(ROOT, "icon.png"), encodePng(300, 200, galleryCard()))
console.log("wrote icons.jres and icon.png")
