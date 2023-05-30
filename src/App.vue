<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="20">
                        <div>
                            <el-image
                                    style="width: 180px; height: 60px;float:left"
                                    :src="logoUrl"
                                    :fit="fit"></el-image>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <UserBarView></UserBarView>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <HomeView/>
            </el-main>
            <el-footer><b @click="showAbout=true" style="cursor: pointer;text-decoration: underline">About Rapid-DNS</b></el-footer>
        </el-container>
        <el-dialog :visible.sync="showAbout" title="Rapid-DNS">
            <AboutView></AboutView>
        </el-dialog>
    </div>
</template>
<script>
import HomeView from "@/views/HomeView.vue";
import UserBarView from "@/views/UserBarView.vue";
import AboutView from "@/views/AboutView.vue";
export default {
    components: {HomeView,UserBarView,AboutView},
    created() {
        if(sessionStorage.getItem("X-STORE")){
            this.$store.replaceState(
                Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("X-STORE")))
            )
        }
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("X-STORE",JSON.stringify(this.$store.state))
        })
    },
    data(){
        return{
            showAbout:false,
            logoUrl:"/logo.png",
            fit:"fill"
        }
    }
}
</script>

<style>
html, body, #app, .el-container {
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.el-header, .el-footer {
    color: #222;
    text-align: center;
    line-height: 60px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
}
</style>
