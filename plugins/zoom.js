import Vue from 'vue'

import { ZoomMtg } from '@zoomus/websdk';

console.log("checkSystemRequirements");

console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// CDN version default

ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.3.7/lib', '/av');

ZoomMtg.preLoadWasm();

ZoomMtg.prepareJssdk();

const MeetingCfg = (meetingId, nickname) => ({

    apiKey: process.env.ZOOM_API_KEY,
    apiSecret: process.env.ZOOM_API_SECRET,
    meetingNumber: "3138372605",
    userName: "trungnq",
    passWord: "",
    leaveUrl: "https://zoom.us",
    role: 0

})

// what variable you hook into Vue's prototype will be available on ANY vue component
Vue.prototype.$ZoomMtg = ZoomMtg
Vue.prototype.$MeetingCfg = MeetingCfg