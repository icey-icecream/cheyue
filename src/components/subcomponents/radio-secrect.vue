<template>
 <div>
  <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
    <span class="radio" :class="{'on':item.isChecked}"></span>
    <input v-model="secrect" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}{{item.tips}}
  </div>
</div>
</template>

<script>
  export default {
    name:'radioSecrect',
    data() {
      return {
        secrect: '公开',
        radios:[
          {
            label: '公开',
            value:'公开',
            isChecked: true,
            tips:'   所有人可见',
          },
          {
            label: '私密',
            value:'私密',
            isChecked: false,
            tips:'   仅自己可见',
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
        this.secrect = this.radios[index].value;
        // 设置值，以供传递
        this.radios[index].isChecked = true;
        this.$emit('childByValue',this.secrect)
      },
      loadData(){
          // 设置一进来是  公开  还是  私密
          _this.secrect = data.Fsecrect
          if(data.Fsecrect === "公开"){
            _this.$set(_this.radios[0],'isChecked',true)  
            _this.$set(_this.radios[1],'isChecked',false)  
          }else{
            _this.$set(_this.radios[0],'isChecked',false)  
            _this.$set(_this.radios[1],'isChecked',true)  
          }
      }
    }
  };
</script>

<style lang="less" scoped>
.radio-box{
  position: relative;
  height: 15px;
  margin-right: 36px;
  font-size: 14px;
  margin-top: -8px;
  font-size: 15px;
  margin-bottom: 24px;
}
.input-radio {
  display: inline-block;
  position: absolute;
  opacity: 0;
  width:40px;
  height: 40px;
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
  background-image: url('../../images/choose.png');
  background-repeat: no-repeat; 
  background-size: 100% 100%;
}
.on {
  background-image: url('../../images/choosed.png');
  background-size: 100% 100%;
}
</style>
