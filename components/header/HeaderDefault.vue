<template>
<div class="baner-overflow">
     <Banner
            v-if="store.checkoutInfo == 'empty' && store.promoCode && store.organization.is_banner_enabled"
            v-show="!dialog"
            @dialogOpen="open"
            @slideOpen="close"
        />
    <div class="fixed-banner" ref="sideBarRef" >
       
        <div class="header-main" :class="{ logHeader: store.auth.loggedIn }">
            <div :class="{topBarMain: scrollPosition < 20, fixedNav: scrollPosition > 20}">
                <div class="topBar-nav">
                    <div class="container-fluid headerContainer">
                        <div class="row nav-align">
                            <div class="col-md-6 col-sm-6">
                                <div class="logo-brand-section">
                                    <button
                                        class="v-btn toggle-btn items-cen"
                                    >
                                        <v-icon icon="mdi-menu" color="white" class="align-center" size="25px"></v-icon>
                                    </button>
                                    <div class="nav-logo">
                                     <img
                                        :src="logo"
                                        height="60"
                                        width="100%"
                                        class="webLogo"
                                        @click="$router.push('/')"
                                     />
                                    </div>
                                    <button
                                        @click="$router.push('/classes')"
                                            class="v-btn nav-single-link"
                                        >{{store.organization.school_type ? store.organization.school_type : 'Fitness Classes'}}
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 mobileview-colum avatar-padding">
                                <div class="top-nav-btns d-flex"
                                >
                                    <clientOnly>
                                        <div
                                        v-if=" $route.path.includes('/checkout')"
                                        ></div>
                                        <button
                                            v-else
                                            class="v-btn full-width-btn-xs"
                                            @click="open"
                                            color
                                            :style="{
                                                backgroundColor: (store.organization.colors || {})['app-main-accent-color'] ?  ( /^#000|^rgba\(0,\s*0,\s*0,\s*1\)/i.test(store.organization.colors['app-main-accent-color']) ? 'gray' : store.organization.colors['app-main-accent-color']) : 'gray'
                                             }"
                                            density="comfortable"
                                            size="small"
                                        >
                                            <span v-text="store.callToAction" />
                                        </button>
                                        
                                        <div class="profile-dropdown-menu" v-if="store.auth.loggedIn">
                                            <div>
                                                <button
                                                    class="v-btn avatar-dropdown-menu"
                                                    @click='toggle = !toggle'
                                                >
                                                    <div
                                                      v-if="isMemberLoggedIn()"
                                                      class="avatar-profile-img text-white"
                                                    >{{loggedInUser || avatarLogo()}}</div>
                                                    <div v-else>
                                                        <v-icon color="#fff" icon="mdi-account"></v-icon>
                                                    </div>
                                                </button>
                                            </div>
                                            <div v-show='toggle' class="profile-dropdown-nav">
                                                <div
                                                    v-if="isMemberLoggedIn()"
                                                    @click="$router.push('/profile')"
                                                    class="profile-link"
                                                >
                                                    Profile
                                                </div>
                                                <button @click="logOut()">
                                                    Logout
                                                </button>
                                            </div>
                                          </div>
                                        <v-btn
                                            variant="outlined"
                                            v-else-if="store.organization.enable_login"
                                            to="/login"
                                            class="ma-2 v-btn loginbtn-view"
                                            :style="{
                                                        color:  (store.organization.colors || {})['app-main-accent-color'] ?  ( /^#000|^rgba\(0,\s*0,\s*0,\s*1\)/i.test(store.organization.colors['app-main-accent-color']) ? 'white' : store.organization.colors['app-main-accent-color']) : 'gray'
                                                    }"
                                        >Login</v-btn>
                                    </clientOnly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{SideBarMain: scrollPosition < 20, SidebarfixedNav: scrollPosition > 20}">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="left-sidebar" v-if="isHidden">
                                <tree-view :items="menuItems" @onItemClick="onNavClick" :expanded="true"></tree-view>
                                <client-only>
                                    <!-- <div v-if="isAdminLoggedIn()">
                                        <v-divider />
                                        <tree-view :items="adminMenu" @onItemClick="onNavClick"></tree-view>
                                    </div> -->
                                </client-only>
                            </div>
                        </div>
                        <div class="col-md-10"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { abbiStore } from '../../stores';
export default {
    setup () {
        const store = abbiStore()
        return {
        store
        }
    },
    data: () => ({
        isHidden: false,
        scrollPosition: null,
        toggle: false,
        loggedInUser:null
    }),
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY;
        },
        // avatarLogo() {
        //     const final_user = this.getUser();
        //     this.loggedInUser=`${
        //         final_user.first_name ? final_user.first_name[0] : ''
        //             }${final_user.last_name ? final_user.last_name[0] : ''}`;
        //     return this.loggedInUser
        // },
        onNavClick(menu) {
            try{
                this.isHidden = !this.isHidden;
                if (
                    menu.name === 'Schedule' &&
                    this.store.location.schedule_override
                ) {
                    window.open(
                        this.store.location.schedule_override,
                        '_blank'
                    );
                } else if (menu.url.match('http')) {
                    window.open(menu.url, '_blank');
                } else {
                    this.$router.push(menu.url);
                }
            }catch(e){
                console.error(e)
            }        
        },
        deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        handleClickOutside(event){
            if(!this.$refs.sideBarRef?.contains(event.target)){
                this.isHidden = false
            }
        }
    },
 
};
</script>


<style lang="scss" scoped>
.fixed-banner{
    // position: fixed;
    background-color: white;
    width: 100%;
    z-index: 99;
}
.header-main{
    position: fixed;
    z-index: 99;
    .nav-align{
        align-items: center;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .nav-logo{
        // max-width: 227px; comment becuase some site logo are strecth e.g timhopeacademy
        max-width: 100%;
        margin: 0 30px;
        .webLogo {
            cursor: pointer;
            top: 0px;
            background-size: contain;
        }
    }
    .nav-link{
        display: flex;
        align-items: center;
        justify-content: center;

        &:after{
          content:'';
          position: absolute;
          background-color: #d5242c;
          width: 142px;
          height: 2px;
          margin-top: 31px;
        }
        &:hover{
          background-color: rgb(22, 21, 21);
        }
      }
    .topBar-nav {
        border-bottom: 1px solid #cccccc8f;
        position: fixed;
        width: 100%;
        background: #000000;
        max-height: 85px;
        min-height: 85px;
        .headerContainer{
           padding: 0px 17px;
           height: 85px;
           display: flex;
           align-items: center;
        }
    }
    .logo-brand-section {
        display: flex;
        .toggle-btn {
            margin-top: 8px;
            background: #272727;
            padding: 0 14px;
            width: 45px;
            height: 45px;
            border-radius: 40px;
            box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%);
        }
    }
    .profile-dropdown-menu{
        height: 50px;
        .avatar-dropdown-menu{
            border-radius: 50px;
            width: 45px;
            min-width: 45px;
            height: 45px;
            padding: 10px 0px;
            border: 1px solid #ccc;
            box-shadow: 2px 3px 5px #cccccc61;
        }
    }
    .profile-dropdown-nav{
        button{
            margin-top:10px;
            color:#333;
            background: #fff;
            padding:10px 10px;
            box-shadow: 0px 1px 5px #ccc;
            position: absolute;
            right:25px;
        }
    }
    .loginbtn-view{
        border: 1px solid;
        padding: 0 16px;
        height: 36px;
        min-width: 61px;
        font-size: 14px;
        // color: white;
    }
    .top-nav-btns {
        // float: right;
        .full-width-btn-xs{
            padding:10px 16px !important;
            color:#fff;
            border-radius: 4px;
            margin-right:10px;
            position: relative;
            // top:1px;
            font-size: .875rem;
            // new adition
            height: 35px;
            top:9px;
            align-content: center;
        }
    }
    .SidebarfixedNav{
         .left-sidebar {
            top: 24px;
            margin-top:60px;
         }
    }
    .left-sidebar {
        background: #ffffff;
        height: 93%;
        position: fixed;
        width: 20%;
        left: 0;
        margin-top:73px;
        overflow-y: hidden;
        box-shadow: 0px 6px 9px #cccccc59;
        padding-top: 10px;
        padding-bottom: 80px;
        &:hover{
            overflow-y: scroll;
        }
    }
    .fixedNav{
      .topBar-nav {
        top: 0;
      }
    }
    .nav-single-link {
        // width: 130px !important;
        width: 170px;
        color: #fff;
        font-size: 14px;
        border-bottom: 2px solid red;
        border-radius: 0px;
        margin: 16px;
        margin-left: 16px;
        // margin-left: 50px;
        &:after{
            content: '';
            position: absolute;
            background: #d5242c;
            width: 142px;
            height: 2px;
            margin-top: 31px;
        }
    }
    .avatar-padding {
        // padding-top: 15px;
    }
    &.logHeader{
      .top-nav-btns{
          &.nav-memberlogin{
          display:flex;
            .avatar-dropdown-menu{
                .avatar-profile-img{
                    color:#fff;
                }
            }
            .profile-dropdown-nav{
                    position: absolute;
                    color: #fff;
                    margin-right: 19px;
                    right: 0;
                    button{
                    right: 0px;
                    padding: 7px 10px;
                    box-shadow: none;
                    }
                .profile-link{
                    color: #000;
                    background: #fff!important;
                    padding: 7px 12px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                }
                &:before{
                    content: '';
                    position: absolute;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-width: 10px;
                    top: -15px;
                    height: 10px;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid #fff;
                    left: 0;
                    right: -28px;
                    width: 10px;
                    margin: auto;
                }
            }

          }
      }
    }
}
.left-sidebar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0px;
    background-color: #f5f5f5;
}
.left-sidebar::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
}
.left-sidebar::-webkit-scrollbar-thumb {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #000;
}
    @media only screen and (max-width: 767px) {
        .header-main{
            .nav-align{
                display: block;
                margin-top: 55px!important;
            }
            .left-sidebar {
                overflow-y: scroll;
                width: 100%;
                margin-top: 62px;
            }
            .nav-single-link {
                display: none !important;
            }
            .nav-logo{
                margin-top:12px;
                .webLogo {
                    max-width: 120px!important;
                    position: absolute !important;
                    left: 0;
                    right: 10px;
                    margin: auto;
                    text-align: center;
                    top: 6px;
                    // height: 70px;
                    // width: 100px;
                    object-fit: contain!important;
                }
            }
            .loginbtn-view {
                position: absolute !important;
                top: 12px;
                right: 7px;
                width: 70px;
                height: 32px!important;
                font-size: 12px !important;
                .avatar-profile-img{
                     font-size: 19px;
                }
            }
            .logo-brand-section{
                .toggle-btn {
                    // margin-top: -24px;
                    width: 40px;
                    height: 40px;
                }
            }
            .top-nav-btns {
                float: inherit;
                margin-top: 20px;
                .full-width-btn-xs{
                    width: 98%;
                    margin: auto;
                    display: block;
                    margin-left: 9px;
                    font-size: 14px;
                    letter-spacing:1px;
                    // margin-top: 20px;
                }
                &.nav-memberlogin{
                    .profile-dropdown-menu{
                      margin-right: 5px;
                        .profile-dropdown-nav{
                            right: 0;
                            // top: 92%;
                            button{
                                top: 39px;
                            }
                            &:before{
                            right: -12px;
                            }
                        }
                    }
                }
            }
            .topBar-nav{
                min-height: 148px;
                max-height:148px;
            }
            .mobileview-colum {
                width: 100% !important;
                flex-basis: auto !important;
            }
            .avatar-dropdown-menu {
                margin-top: 10px;
                position: absolute;
                top:5px;
                right:10px;
                .avatar-dropdown-menu{
                    width: 45px;
                    min-width: 45px;
                    height: 45px;
                    padding: 10px 0px;
                }
            }
            .avatar-padding{
                padding-top: 9px;
                margin-top:10px;
            }
            .profile-dropdown-nav{
                margin-top:0px;
                button{
                    top:67px;
                    right:16px;
                }
            }
            &.logHeader{
                .topBar-nav{
                   min-height: 80px;
                   max-height: 80px;
                   padding:10px 0px;
                }
            }
        }
        .baner-overflow{
            overflow-x: hidden;
        }
    }
@media (min-width: 768px) and (max-width: 900px) {
    .header-main{
        .toggle-btn {
            margin-top: 8px;
        }
        .webLogo {
            max-width: 125px !important;
            top: -3px;
        }
        .nav-single-link{
            color: #ffffff;
            font-size: 12px;
        }
        .loginbtn-view {
            font-size:12px;
        }
        .top-nav-btns{
            color: #fff;
            font-size: 12px;
            display: flex;
    width: 65%;
            .full-width-btn-xs{
                padding: 10px 13px;
                letter-spacing: 1px;
                top:0;
            }
        }
        .nav-single-link {
            margin-top: -5px;
        }
        .left-sidebar {
            width: 50%;
            margin-top:72px;
        }
        .SidebarfixedNav{
            .left-sidebar{
                margin-top:60px;
            }
        }
    }
}
@media (min-width: 901px) and (max-width: 1366px) {
   .header-main{
        .toggle-btn {
            margin-top: 8px;
        }
        .webLogo {
            max-width: 125px;
            top: -3px;
        }
        .nav-single-link{
            color: #ffffff;
            font-size: 12px;
        }
        .top-nav-btns{
            color: #fff;
            font-size: 11px;
        }
        .nav-single-link {
            margin-top: 7px;
        }
        .left-sidebar {
            width: 33%;
        }
   }
}
</style>





