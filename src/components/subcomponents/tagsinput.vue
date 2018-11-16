// TagsInput.vue
<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      :multiple-limit="5"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-show="button" v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
  </div>
</template>

<script>
export default {
    data(){
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        inputValueMaxLength:8,
        button:true,
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
        
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
          this.$emit('childByValue',this.dynamicTags)
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    watch:{
      inputValue(){
        // 判断标签字数
        if (this.inputValue.length > this.inputValueMaxLength) {
               this.$message({
                 type:'error',
                 message:"标签字数过长"
               })
                this.inputValue=''
            }
          // 判断标签个数  
         if ($(".el-tag").length>4) {
          this.$message({
            type:'error',
            message:'最多只能添加5个标签'
          })
           this.inputVisible = false;
           this.inputValue = '';
        }          
      }
    }
  }
</script>

<style lang='less'>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-tag {
    background-color: #D8DADE;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #3D4658;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #3D4658;
    white-space: nowrap;
  }
  .el-tag .el-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    top: -1px;
    right: -5px;
    color: #3D4658;
}
.el-tag:hover .el-icon-close:hover{
  background: #3D4658;
} 
</style>