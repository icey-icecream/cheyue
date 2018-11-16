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
        <el-form-item  prop="phone">
          <el-input placeholder="请输入手机号" type="text" v-model="ruleForm2.phone" autocomplete="on" @keyup.native.enter="submitForm('ruleForm2')"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input placeholder="请输入密码" id="loginInput" type="password" v-model="ruleForm2.password" autocomplete="off" @keyup.native.enter="submitForm('ruleForm2')"></el-input>
        </el-form-item>
        <div class="other">
          <router-link to="./phone">手机验证码登录</router-link>
          <router-link to="./forget">忘记密码？</router-link>
        </div>
        <el-form-item>
          <button style="width:274px;border:none;color:#fff;background:#ED3636;" @click.prevent="submitForm('ruleForm2')">登录</button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>
<script type="js/ecmascript" src="md5.js"></script>
<script>
  import aesUtil from '../../js/aesUtil.js';
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
      var validatename2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }
      };
      return {
        ruleForm2: {
          phone: '',
          password: '',
        },
        rules2: {
          phone: [{
            validator: validatename,
            trigger: 'blur'
          }],
          password: [{
            validator: validatename2,
            trigger: 'blur'
          }]
        }
      };
    },
    mounted() {
        this.setUserData();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(this.common.projectName_ + 'user/passwordLogin.action?',{
              params : {
                phone : this.ruleForm2.phone,
                password : this.ruleForm2.password
              }
            })
            .then((response) => {
              var result=response.data;
              //检查后台返回结果
              var resultMessage = this.common.checkResult(result);
              this.setUserData();
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
      //读取cookie
      getCookie: function(c_name) {
          if (document.cookie.length>0) {
              var strCookie = document.cookie;
              var arrCookie = strCookie.split("; ");
          for(var i = 0; i < arrCookie.length; i++) {
              var arr = arrCookie[i].split("=");
              if(c_name == arr[0]){
                  return arr[1];
              }
            }
          }
          return "";
      },
      setUserData(){
            var userPhone= decodeURIComponent(this.getCookie("cheyue_phone"),'utf-8');
            var userPwd =decodeURIComponent(this.getCookie("cheyue_password"),'utf-8');
            if (userPhone != null && userPhone != '') {
                this.ruleForm2.phone = aesUtil.decrypt(userPhone); //保存到保存数据的地方
            } else {
                this.ruleForm2.phone = '';
            }
            if(userPwd != null && userPwd != '') {
                this.ruleForm2.password = aesUtil.decrypt(userPwd);
            } else {
                this.ruleForm2.password = '';
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

      .el-input{
        width:274px;
      }

      .other {
        height: 42px;
        text-align: center;
        display: flex;
        justify-content: space-between;

        a {
          font-size: 12px;
          color: #000;
        }

        a:hover {
          text-decoration: none;
          color: #ED3636;
        }
      }
    }
  }
</style>