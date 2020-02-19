import Vue from "vue"

/**
 * 10000 => "10.000"
 * @param {number} num
 * @param {string} separator
 */
function toThousandFilter(num, separator = '.') {
    console.log("[toThousandFilter]", num)
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, separator))
}

const filters = {
    toThousandFilter,
}

// register global utility filters
export default Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
