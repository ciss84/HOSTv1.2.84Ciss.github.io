var AF_INET = 2;
var SOCK_STREAM = 1;

function socket() {
    var ret = p.syscall(97, AF_INET, SOCK_STREAM, 0);
    return ret;
}

function connect(fd, ip, port) {
    var c = new Uint32Array(0x10);
    var nums = ip.split('.')
    for (var i = 0; i < 4; i++)
        nums[i] = parseInt(nums[i])
    c[0] |= ((port >> 0x8) & 0xFF) << 0x10 | (port) << 0x18
    c[0] |= 0x2 << 0x8
    c[1] = nums[3] << 24 | nums[2] << 16 | nums[1] << 8 | nums[0];

    write_data(ropframeptr, c);
    var ret = p.syscall(98, fd, ropframeptr, 0x10);
    return ret;
}

function write(fd, addr, len) {
    var ret = p.syscall(4, fd, addr, len);
    return ret;
}