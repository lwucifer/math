import Vue from "vue"

/**
 * 10000 => "10.000"
 * @param {number} num
 * @param {string} separator
 */
export function toThousandFilter(num, separator = '.') {
    // console.log("[toThousandFilter]", num)
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, separator))
}

/**
 * Filesize Filter
 * @Param {number} size
 * @return string
 */
export function fileSizeFilter(size) {
    if (isNaN(size))
        size = 0;

    if (size < 1024)
        return size + ' Bytes';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' KB';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' MB';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' GB';

    size /= 1024;

    return size.toFixed(2) + ' TB';
}

const filters = {
    toThousandFilter,
    fileSizeFilter
}

// register global utility filters
export default Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
