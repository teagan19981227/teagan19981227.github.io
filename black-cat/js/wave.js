var Wave = function() { "use strict";

    function o(t) { var i = t; if (/^(rgb|RGB)/.test(i)) { for (var s = i.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), o = "#", e = 0; e < s.length; e++) { var n = Number(s[e]).toString(16);
                n.length < 2 && (n = "0" + n), o += n } return 7 !== o.length && (o = i), o } if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(i)) { var h = i.replace(/#/, "").split(""); if (6 === h.length) return i; if (3 === h.length) { var r = "#"; for (e = 0; e < h.length; e += 1) r += h[e] + h[e]; return r } } return i }

    function e(t, i) { var s = t.toLowerCase(); if (s && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(s)) { if (4 === s.length) { for (var o = "#", e = 1; e < 4; e += 1) o += s.slice(e, e + 1).concat(s.slice(e, e + 1));
                s = o } var n = []; for (e = 1; e < 7; e += 2) n.push(parseInt("0x" + s.slice(e, e + 2))); return "rgba(" + n.join(",") + "," + i + ")" } return s } return function() {
        function t(t, i) { this.container = document.querySelector(t), this.options = Object.assign({ number: 3, smooth: 50, velocity: 1, height: .3, colors: ["#ff7657"], border: { show: !1, width: 2, color: [""] }, opacity: .5, position: "bottom" }, i), this.lines = [], this.frame = null, this.step = 0, this.status = "pause", this.init(), this.draw() } return t.prototype.init = function() { if (null === this.container.querySelector("canvas")) { var t = document.createElement("canvas");
                this.container.appendChild(t) }
            this.canvas = this.container.querySelector("canvas"), this.canvas.width = this.container.offsetWidth, this.canvas.height = this.container.offsetHeight, this.ctx = this.canvas.getContext("2d"), this.setLines() }, t.prototype.animate = function() { this.status = "animating", this.draw() }, t.prototype.pause = function() { cancelAnimationFrame(this.frame), this.frame = null, this.status = "pause" }, t.prototype.setOptions = function(t) { this.options = Object.assign(this.options, t), this.setLines(), this.reset(), "pause" === this.status && this.draw() }, t.prototype.reset = function() { this.init() }, t.prototype.draw = function() { var h = this,
                r = this.canvas,
                a = this.ctx,
                c = this.getWaveHeight();
            a.clearRect(0, 0, r.width, r.height), this.step += this.options.velocity, this.lines.forEach(function(t, i) { var s = (h.step + 180 * i / h.lines.length) * Math.PI / 180,
                    o = Math.sin(s) * h.options.smooth,
                    e = Math.cos(s) * h.options.smooth,
                    n = h.getVertexs(o, e);
                a.fillStyle = t.rgba, a.beginPath(), a.moveTo(n[0][0], n[0][1]), h.options.border.show && (a.lineWidth = h.options.border.width, a.strokeStyle = h.options.border.color[i] ? h.options.border.color[i] : t.hex), "left" === h.options.position || "right" === h.options.position ? a.bezierCurveTo(c + o - h.options.smooth, r.height / 2, c + e - h.options.smooth, r.width / 2, n[1][0], n[1][1]) : a.bezierCurveTo(r.width / 2, c + o - h.options.smooth, r.width / 2, c + e - h.options.smooth, n[1][0], n[1][1]), h.options.border.show && a.stroke(), a.lineTo(n[2][0], n[2][1]), a.lineTo(n[3][0], n[3][1]), a.lineTo(n[0][0], n[0][1]), a.closePath(), a.fill() }); var t = this; "animating" === this.status && (this.frame = requestAnimationFrame(function() { t.draw() })) }, t.prototype.setLines = function() { this.lines = []; for (var t = 0; t < this.options.number; t++) { var i = this.options.colors[t % this.options.colors.length],
                    s = { hex: o(i), rgba: e(i, this.options.opacity) };
                this.lines.push(s) } }, t.prototype.getVertexs = function(t, i) { var s = this.canvas.height,
                o = this.canvas.width,
                e = this.getWaveHeight(); switch (this.options.position) {
                case "bottom":
                    return [
                        [0, e + t],
                        [o, e + i],
                        [o, s],
                        [0, s]
                    ];
                case "top":
                    return [
                        [0, e + t],
                        [o, e + i],
                        [o, 0],
                        [0, 0]
                    ];
                case "left":
                    return [
                        [e + t, 0],
                        [e + i, s],
                        [0, s],
                        [0, 0]
                    ];
                case "right":
                    return [
                        [e + t, 0],
                        [e + i, s],
                        [o, s],
                        [o, 0]
                    ] } }, t.prototype.getWaveHeight = function() { if (1 < this.options.height) switch (this.options.position) {
                case "bottom":
                    return this.canvas.height - this.options.height;
                case "top":
                case "left":
                    return this.options.height;
                case "right":
                    return this.canvas.width - this.options.height } else switch (this.options.position) {
                case "bottom":
                    return this.canvas.height * (1 - this.options.height);
                case "top":
                    return this.canvas.height * this.options.height;
                case "left":
                    return this.canvas.width * this.options.height;
                case "right":
                    return this.canvas.width * (1 - this.options.height) } }, t }() }();