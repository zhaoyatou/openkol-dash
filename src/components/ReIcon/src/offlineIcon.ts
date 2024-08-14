import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import Finance from "@iconify-icons/ep/credit-card";
import Stock from "@iconify-icons/ep/box";
import Redmine from "@iconify-icons/ep/calendar";
import Store from "@iconify-icons/ep/handbag";
import Customer from "@iconify-icons/ep/avatar";
import Setting from "@iconify-icons/ep/setting";
import Key from "@iconify-icons/ep/key";
import User from "@iconify-icons/ep/user";
import Calendar from "@iconify-icons/ep/calendar";
import Admin from "@iconify-icons/ep/suitcase";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("finance", Finance);
addIcon("stock", Stock);
addIcon("redmine", Redmine);
addIcon("store", Store);
addIcon("customer", Customer);
addIcon("setting", Setting);
addIcon("key", Key);
addIcon("user", User);
addIcon("calendar", Calendar);
addIcon("admin", Admin);
