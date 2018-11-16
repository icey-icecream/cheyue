<template>
  <div class="paging">
    <div class="pageData">共<p>{{ all }}</p>页/<p>{{datanumber}}</p>条数据</div>
    <div class="pageright">
      <ul class="mo-paging">
      <!-- prev -->
      <li :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]" @click="prev">上一页</li>
      <!-- first -->
      <li :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]" @click="first">首页</li>
      <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">...</li>
      <li :class="['paging-item', {'paging-item--current' : index === pager}]" v-for="pager in pagers" @click="go(pager)"
        v-bind:key>{{ pager }}</li>
      <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">...</li>
      <!-- last -->
      <li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">尾页</li>
      <!-- next -->
      <li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">下一页</li>
    </ul>
    <div class="jumpPage">
      跳至<input type="text">页
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'paging',
    props: {
      //页面中的可见页码，其他的以...替代, 必须是奇数
      perPages: {
        type: Number,
        default: 5
      },
      //当前页码
      pageIndex: {
        type: Number,
        default: 1
      },
      //每页显示条数
      pageSize: {
        type: Number,
        default: 10
      },
      //总记录数
      total: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        state: '',
        all: 10,
        datanumber: 100,
        index: this.pageIndex, //当前页码
        limit: this.pageSize, //每页显示条数
        size: this.total || 1, //总记录数
        showPrevMore: false,
        showNextMore: false,
      }
    },
    methods: {
      prev() {
        if (this.index > 1) {
          this.go(this.index - 1)
        }
      },
      next() {
        if (this.index < this.pages) {
          this.go(this.index + 1)
        }
      },
      first() {
        if (this.index !== 1) {
          this.go(1)
        }
      },
      last() {
        if (this.index != this.pages) {
          this.go(this.pages)
        }
      },
      go(page) {
       if (this.index !== page) {
          this.index = page
          //父组件通过change方法来接受当前的页码
          this.$emit('change', this.index)
        }
      }
    },   
    computed: {
      //计算总页码
      pages() {
        return Math.ceil(this.size / this.limit)
      },
      //计算页码，当count等变化时自动计算
      pagers() {
        const array = []
        const perPages = this.perPages
        const pageCount = this.pages
        let current = this.index
        const _offset = (perPages - 1) / 2
        const offset = {
          start: current - _offset,
          end: current + _offset
        }
        //-1, 3
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount)
          offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1
        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < pageCount)
        for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }
        return array
      }
    },
    watch: {
      pageIndex(val) {
        this.index = val || 1
      },
      pageSize(val) {
        this.limit = val || 10
      },
      total(val) {
        this.size = val || 1
      }
    }
  };
</script>

<style lang="less" scoped>
.paging{
  width: 100%;
  display: flex;
  justify-content: space-between;
  float: right;
  margin-top: 30px;
  .pageData{
  display: flex;
  margin-right: 10px;
  p{
  color: #ED3636;
  }
  }
  .mo-paging {
  display: inline-block;
  padding-top: 5px;
  font-size: 0;
  list-style: none;
  user-select: none;
  margin: 0;
  >.paging-item {
  display: inline;
  font-size: 14px;
  position: relative;
  padding: 6px 12px;
  // line-height: 1.42857143;
  text-decoration: none;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-left: -1px;
  cursor: pointer;
  color: #0275d8;

  &:first-child {
  margin-left: 0;
  }

  &:hover {
  background-color: #3D4658;
  color: #fff;
  }

  &.paging-item--disabled,
  &.paging-item--more {
  background-color: #fff;
  color: #505050;
  }

  //禁用
  &.paging-item--disabled {
  cursor: not-allowed;
  opacity: .75;
  }

  &.paging-item--more,
  &.paging-item--current {
  cursor: default;
  }

  //选中
  &.paging-item--current {
  background-color: #3D4658;
  color: #fff;
  position: relative;
  z-index: 1;
  }
  }
  }
  .jumpPage{
  margin-left: 30px;
  input{
  width: 29px;
  height: 29px;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px solid #CDCDCD;
  font-size: 14px;
  text-align: center;
  }
  }
}
.paging .pageright{
  display: flex;
}
</style>
