
import User from './User.vue'
import ListImage from './ListImage.vue'
export const routes=[
    {path:'/', name:'home', component:ListImage},
    {path:'/user/:username', name:'user',component:User}
]