<template>
  <div>
    <div class="topBar">
      <img src="../../images/logo.png">
      <router-link to="./register">注册</router-link>
    </div>
    <div class="login-form">
      <div class="top-login">
        <span><img src="../../images/carPlan.png" alt="" /></span>
      </div>
      <div class="login-area">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item  prop="phone" >
          <el-input placeholder="请输入手机号" type="text" v-model="ruleForm2.phone" autocomplete="off" @keyup.native.enter="submitForm('ruleForm2')"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input style="width:162px;margin-left:-110px;" id="getcode" placeholder="请输入验证码" type="text" v-model="ruleForm2.code" autocomplete="off" @keyup.native.enter="submitForm('ruleForm2')"></el-input>
          <span v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-form-item>
        <router-link to="/login" class="accountLogin">账号登录</router-link>   
        <el-form-item style="padding-top:14px;">
          <button style="width:274px;border:none;color:#fff;background:#ED3636" @click.prevent="submitForm('ruleForm2')">登录</button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var validatename3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else {
          callback();
        }
      };
      return {
        show: true,
        count: '',
        timer: null,
        ruleForm2: {
          name: '',
          code:'',
        },
        rules2: {
          name: [{
            validator: validatename,
            trigger: 'blur'
          }],
          code: [{
            validator: validatename3,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(this.common.projectName_ + 'user/codeLogin.action?',{
              params : {
                phone : this.ruleForm2.phone,
                code : this.ruleForm2.code
              }
            })
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              if (result.code == 0) {
                  if (result.data == 0) {
                    this.$message.error(result.message);
                    this.$router.push({path: resultMessage});
                  } else {
                    this.$router.push({path: resultMessage});
                  }
              } else {
                this.$message.error(resultMessage);
              }
            })
            .catch(function (error) {
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       //点击获取验证码按钮先判断手机号是否为空
      validatePhone(val){
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (!reg.test(val)) {
             this.$message({
                    type: "error",
                    message: "请先输入手机号"
                  });
                  return true;
          }else{
            return false;
          }
      },
      getCode(){
           // 调用点击获取验证码的时候手机号是否为空
        if(this.validatePhone(this.ruleForm2.phone)){
          return;
        }
          this.axios.get(this.common.projectName_ + 'user/sendCode.action?',{
            params : {
              phone : this.ruleForm2.phone
            }
          })
          .then((response) => {
            var result=response.data;
            //检查后台返回结果
            var resultMessage = this.common.checkResult(result);
            if (result.code == 0) {
              if (result.data) {
               this.$message.info('短信下发成功');
              } 
            } else {
              this.$message.error(resultMessage);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--; 
          } else { 
            this.show=true; 
            clearInterval(this.timer);
            this.timer=null; 
          } 
        }, 1000)
      } 
     }
    }
  }
</script>

<style lang="less" scoped>

  .topBar {
    width: 100%;
    height: 61px;
    background-color: #3D4658;
    display: flex;
    justify-content: space-around;

    img {
      width: 137.1px;
      height: 46px;
      margin-top: 7.5px;
    }

    a {
      color: #fff;
      font-size: 12px;
      line-height: 61px;
    }

    a:hover {
      color: #ED3636;
      text-decoration: none;
    }
  }

  .login-form {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;

    .top-login {
      text-align: center;
      margin-top: 120px;
    }
  
    .login-area {
      padding-top: 30px;
      text-align: center;
      width: 274px;
      margin: 0 auto;
     #getcode{
        width: 162px!important;
        background-color: pink;
      }

      .el-input{
        width: 274px;
      }
      span{
        display: block;
        width: 100px;
        background-color: #ED3636;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 12px;
        margin-top: -40px;
        margin-left: 170px;
      }
       .accountLogin{
      text-decoration: none;
      float: left;
      font-size: 12px;
      color: #000;
      margin-bottom: 25px;
      }
      a:hover {
      color: #ED3636;
      text-decoration: none;
      }
    }
  }
</style>