<template>
  <div>
    <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
      <span class="radio" :class="{'on':item.isChecked}"></span>
      <input v-model="sex" :value="item.value" class="input-radio" :checked='item.isChecked' @click="check(index)"
        type="radio">{{item.label}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'radio',
    data() {
      return {
        sex: '男',
        radios: [{
            label: '男',
            value: '男',
            isChecked: true,
          },
          {
            label: '女',
            value: '女',
            isChecked: false,
          },
        ]
      }
    },
    methods: {
      check(index) {
        // 先取消所有选中项
        this.radios.forEach((item) => {
          item.isChecked = false;
        });
        //再设置当前点击项选中
        this.sex = this.radios[index].value;
        // 设置值，以供传递
        this.radios[index].isChecked = true;
        this.$emit('childByValue',this.sex)
      },
      loadData() {
        // 设置一进来是  男  还是  女
        _this.sex = data.Fsex
        if (data.Fsex === "男") {
          _this.$set(_this.radios[0], 'isChecked', true)
          _this.$set(_this.radios[1], 'isChecked', false)
        } else {
          _this.$set(_this.radios[0], 'isChecked', false)
          _this.$set(_this.radios[1], 'isChecked', true)
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .radio-box {
    display: inline-block;
    position: relative;
    height: 25px;
    margin-right: 36px;
    font-size: 14px;
    margin-top: -8px;
    font-size: 15px;
  }

  .input-radio {
    display: inline-block;
    position: absolute;
    opacity: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    left: 0px;
    outline: none;
    -webkit-appearance: none;
  }

  .radio {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
    background-image: url('./../../images/choose.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .on {
    background-image: url('./../../images/choosed.png');
    background-size: 100% 100%;
  }
</style>
