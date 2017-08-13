import FilterBar from './FilterBar'
import ProductList from './ProductList'
import ajax from 'axios'
import each from '../libs/each'

export default {
  data() {
    return {
      page: 0,
      term: '',
      sorting: '_score',
      res: null,
      selection: {}
    }
  },

  el: '[data-vue="Catalogue"]',

  created() {
    this.doFilter({})
  },

  methods: {
    doFilter(selection) {
      this.selection = selection

      ajax.defaults.baseURL = 'https://sapi.searchblok.com/v1/speed100store/product'

      ajax.post('/_search', this.buildQuery())
        .then((res) => {
          this.res = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    buildQuery() {
      let filters = []
      filters.push({
        range : {
          price: {
            gte: 0,
            lte: 999
          }
        }
      })

      each(this.selection, (item, key) => {
        if (item) {
          var term = {term: {}}
          term.term[key + '.keyword'] = {value: item}

          filters.push(term)
        }
      })

      let must = []

      /*must.push({
        multi_match: {
          query: this.term,
          fields: ['name', 'sku']
        }
      })*/

      /*_.each(this.filter, (value, key) => {
        if (!_.isEmpty(value)) {
          var term = {term: {}}
          term.term[key + '.keyword'] = {value: value[0]}

          filters.push(term)
        }
      })*/

      let query = {
        from: this.page * 24,
        size: 24,
        query: {
          bool: {
            must: must,
            filter: filters
          }
        },
        sort: this.sorting,
        aggs: {
          color: {
            terms: {field: 'color.keyword'}
          },
          maxPrice: {
            max: {field: 'price'}
          },
          minPrice: {
            min: {field: 'price'}
          }
        }
      }

      return query
    }
  },

  components: {
    'filter-bar': FilterBar,
    'product-list': ProductList
  }
}
