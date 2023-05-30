<template>
    <div>
        <div style="float:right" v-if="currentUser==''">
            <el-link type="primary" @click="loginForm.visible=true">登录</el-link>
            <span style="width:20px;display: inline-block"></span>
            <el-link type="success" @click="registerForm.visible = true">注册</el-link>
        </div>
        <div style="float:right;text-align: center" v-else>
            <el-menu default-active="1" class="el-menu-demo my_info" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-setting" style="margin-right: 10px"></i><b>{{
                        currentUser
                        }}</b></template>
                    <el-menu-item index="2-1" @click="showMyDomains">我的域名</el-menu-item>
                    <el-menu-item index="2-2" @click="modifyPasswordForm.visible=true">修改密码</el-menu-item>
                    <el-menu-item index="2-3" @click="logoutHandler">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 登錄窗口 -->
        <el-dialog title="Rapid-DNS" :visible.sync="loginForm.visible" width="30%">
            <el-form class="login-register-form" :model="loginForm" :inline="false" label-position="right">
                <el-form-item label="账号" label-width="80px">
                    <el-input class="login_input" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input class="login_input" v-model="loginForm.password" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loginForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="loginHandler">确 定</el-button>
            </div>
        </el-dialog>
        <!-- register form -->
        <el-dialog title="Rapid-DNS" :visible.sync="registerForm.visible" width="30%">
            <el-form class="login-register-form" :model="registerForm" :inline="false" label-position="right">
                <el-form-item label="账号" label-width="80px">
                    <el-input class="login_input" v-model="registerForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" label-width="80px">
                    <el-input class="login_input" v-model="registerForm.password" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
                <el-form-item label="密码确认" label-width="80px">
                    <el-input class="login_input" v-model="registerForm.retype_password" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="registerForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="registerSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="我的域名" :visible.sync="mydomainForm.visible" width="900px">
            <el-form :model="mydomainForm" :inline="true" label-position="right">
                <el-form-item v-for="item in mydomainForm.list" :key="item.domain" style="height: 100%;display: inline-block;">
                <el-form-item label="域名" :label-width="formLabelWidth" >
                    <el-input style="font-weight: bold" v-model="item.domain" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="A记录" :label-width="formLabelWidth">
                    <el-ip-input v-model="item.ipv4" autocomplete="off"></el-ip-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="success" icon="el-icon-check" circle @click="modifyDomain(item)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteDomain(item)"></el-button>
                </el-form-item>
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog title="修改密码" :visible.sync="modifyPasswordForm.visible" width="30%">
            <el-form class="login-register-form" :model="modifyPasswordForm" :inline="false" label-position="right">
                <el-form-item label="原密码" label-width="80px">
                    <el-input class="login_input" v-model="modifyPasswordForm.oldPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="80px">
                    <el-input class="login_input" v-model="modifyPasswordForm.newPassword" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
                <el-form-item label="密码确认" label-width="80px">
                    <el-input class="login_input" v-model="modifyPasswordForm.newRPassword" autocomplete="off"
                              show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyPasswordForm.visible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPasswordSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {listMyDomains, login, logout,updateDomain,dropDomain,registerAccount,updatePassword} from "@/api";
import {mapState} from "vuex";

export default {
    name: "UserBarView",
    computed: mapState({
        currentUser: 'user'
    }),
    data() {
        return {
            formLabelWidth: "120px",
            loginForm: {
                username: "",
                password: "",
                visible: false
            },
            registerForm: {
                username: "",
                password: "",
                retype_password: "",
                visible: false
            },
            modifyPasswordForm:{
                visible:false
            },
            mydomainForm: {
                visible: false,
                list: []
            }
        }
    },
    methods: {
        modifyPasswordSubmit(){
            updatePassword(this.modifyPasswordForm).then(resp=>{
                if(resp.code==200){
                    this.$message({message:"恭喜你,密码修改成功",type:"success"})
                    this.modifyPasswordForm.visible = false
                }
            })
        },
        registerSubmit() {
            registerAccount(this.registerForm).then(resp=>{
                if(resp.code==200){
                    this.$message({message:"账号注册成功",type:"success"})
                    this.registerForm.visible = false
                }
            })
        },
        showMyDomains() {
            listMyDomains().then(resp => {
                if (resp.data) {
                    console.log(resp.data)
                    this.mydomainForm.list = resp.data
                    this.mydomainForm.visible = true
                }
            })
        },
        deleteDomain(item) {
            dropDomain(item).then(resp=>{
                if(resp.code==200){
                    this.showMyDomains()
                    this.$message({message:"域名删除成功",type:"success"})
                }
            })
        },
        modifyDomain(item){
            updateDomain(item).then(resp=>{
                if(resp.code==200){
                    this.$message({message:"域名更新成功",type:"success"})
                }
            })
        },
        async logoutHandler() {
            this.$store.state.user = ""
            let resp = await logout(this.loginForm)
            if (resp.data > 0) {
                this.$store.state.user = ""
            }
        },
        async loginHandler() {
            let resp = await login(this.loginForm)
            if (resp.data > 0) {
                this.$store.state.user = this.loginForm.username
                this.loginForm.visible = false
            }
        }
    }
}
</script>

<style scoped>
.login-register-form {
    padding: 20px;
}
</style>