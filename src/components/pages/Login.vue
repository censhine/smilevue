<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
            
        />
        <div class="regster-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon = "username = ''"
                :error-message = "userErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message = "passwordErrorMsg"
            />
            <div class="register-button">
                <van-button type="primary" :loading="openLoading" size="large" @click="submitLogin">马上登录</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
export default {
    data() {
        return {
            username:'',
            password:'',
            openLoading: false,
            userErrorMsg: '',
            passwordErrorMsg: ''
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        checkForm(){
            let isOk = true;
            this.userErrorMsg = ''
            this.passwordErrorMsg = ''
            if(this.username.length < 5){
                this.userErrorMsg = '用户名不能少于5位'
                isOk = false
            }
            if(this.password.length < 5){
                this.passwordErrorMsg = '密码不能少于6位'
                isOk = false
            }
            return isOk
        },
        submitLogin(){
            this.checkForm() && this.axiosLoginUser()
        },
        axiosLoginUser(){
            this.openLoading = true
            axios({
                url: url.loginUser,
                method: 'post',
                data:{
                    userName: this.username,
                    password: this.password
                }
            }).then(response=>{
                 console.log(response.data)   
                 if(response.data.code == 200){
                     new Promise((resolve,reject)=>{
                        localStorage.userInfo = {userName:this.username}     
                        setTimeout(()=>{
                            resolve()
                        },500)
                     }).then(()=>{
                        Toast.success('登录成功')
                        this.$router.push('/')
                     }).catch(err=>{
                         console.log(err)
                         Toast.fail('登录状态保存失败')
                     })
                 }else{
                     console.log(response.data.msg)
                     Toast.fail(response.data.msg)
                     this.openLoading = false;
                 }
            }).catch((error)=>{
                console.log(error)    
                this.openLoading = false;
            })
        }
    },
    created(){
        if(localStorage.userInfo){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.register-panel{
    width: 96%;
    border-radius: 5px;
    margin: 1.2rem auto;
    padding-bottom: 3.2rem;
}
.register-button{
    padding-top: 10px;
}
</style>