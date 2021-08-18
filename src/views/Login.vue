<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-20 15:52:03
 * @LastEditTime: 2021-08-18 15:26:55
 * @LastEditors: yuguangzhou
 * @Description: 
-->
<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-bg">
        <img src="../assets/image/login-bg.png" alt="">
      </div>
      <div class="login-form">
      <div class="login-logo">
        <img src="../assets/image/logo.svg" alt="" />
      </div>
      <div class="login-content">
        <a-form :model="formData" ref="loginForm" :label-col="{ span: 4 }" :rules="rules" :wrapper-col="{ span: 14 }">
          <a-form-item ref="userName" label="" name="userName">
            <a-input style="width: 240px"  placeholder="admin"   allow-clear v-model:value="formData.userName" autocomplete="off"> </a-input>
          </a-form-item>
          <a-form-item label="" required name="passwordMd5"> <a-input-password allow-clear style="width: 240px" v-model:value="formData.passwordMd5"  autocomplete="off" placeholder="123456"> </a-input-password> </a-form-item>
        </a-form>
      </div>
      <div class="login-tool">
        <a-button type="primary" @click="handleLogin" shape="round" style="width: 240px">登录</a-button>
      </div>
    </div>
    </div>
   
  </div>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { loginAjax } from "@/api/user";
import md5 from "js-md5";
import { setToken } from "@/utils/token";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    const state = reactive({
      formData: {
        userName: "",
        passwordMd5: "",
      },
      rules: {
        userName: [{ required: true, message: "用户名必填", trigger: "blur" }],
        passwordMd5: [{ required: true, message: "密码必填", trigger: "blur" }],
      },
    });

    const handleSubmit = () => {
      state.formData.passwordMd5 = md5(state.formData.passwordMd5);
      loginAjax(state.formData).then((res) => {
        setToken("token", res);
        message.success("登录成功");
        router.push({ path: "/" });
      });
    };
    // 检验表单
    const handleLogin = () => {
      loginForm.value
        .validate()
        .then(() => {
          handleSubmit();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      ...toRefs(state),
      loginForm,
      handleLogin,
      handleSubmit,
    };
  },
};
</script>

<style scoped lang="less">
.login-page {
  min-height: 100%;
  background-color: #7350ac;
  /* background: url("../assets/image/login-bg.png") no-repeat ; */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrapper{
  display: flex;
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
}
.login-bg{
  width: 60%;
  border-right: 1px solid #7350ac;
  img{
    width: 100%;
  }
}
.login-form {
  width: 40%;
  padding: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.login-logo {
  width: 100px;
  height: 100px;
  margin: 10px auto 20px;
}
.login-logo img {
  width: 100px;
  height: 100%;
}

.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-tool {
  width: 240px;
  margin: 30px auto;
  text-align: center;
}
</style>
