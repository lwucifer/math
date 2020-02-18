import Vue from "vue"

/**
 * 10000 => "10.000"
 * @param {number} num
 * @param {string} separator
 */
function toThousandFilter(num, separator = '.') {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, separator))
}

const FILTERS = {
    toThousandFilter: toThousandFilter
}

// register global utility filters
Object.keys(FILTERS).forEach(key => {
    Vue.filter(key, FILTERS[key])
})
