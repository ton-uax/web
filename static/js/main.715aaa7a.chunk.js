(this.webpackJsonpproject_v2=this.webpackJsonpproject_v2||[]).push([[0],{2:function(e,t,a){e.exports={title:"Stats_title__2lySv",row:"Stats_row__30pvA",name:"Stats_name__4A6EJ"}},27:function(e,t,a){e.exports={title:"AdminWallet_title__2kpD4"}},28:function(e,t,a){e.exports={button:"AdminBtn_button__1CAug"}},29:function(e){e.exports=JSON.parse('{"ABI version":2,"header":["time"],"functions":[{"name":"constructor","inputs":[{"name":"id","type":"uint16"}],"outputs":[]},{"name":"setupTokenWallet","inputs":[{"name":"id","type":"uint16"},{"name":"tex","type":"address"},{"name":"eventLog","type":"address"}],"outputs":[]},{"name":"credit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"debit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"confirm","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"deny","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"buyTokens","inputs":[{"name":"amount","type":"uint32"}],"outputs":[]},{"name":"transferTokensDirectly","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokens","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokensToFriend","inputs":[{"name":"id","type":"uint16"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"initMember","inputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"idx","type":"uint8"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"meet","inputs":[{"name":"id","type":"uint16"},{"name":"a","type":"address"}],"outputs":[]},{"name":"updateClients","inputs":[{"name":"a","type":"address"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"getEnv","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"getEnv2","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"_balance","inputs":[],"outputs":[{"name":"_balance","type":"uint32"}]}],"data":[],"events":[]}')},3:function(e,t,a){e.exports={main:"Header_main__2r9vH",logo:"Header_logo__3_SJs",logoImage:"Header_logoImage__2KwYz",title:"Header_title__3SH2Q",menu:"Header_menu__BQHSW",link:"Header_link__2wI74"}},30:function(e){e.exports=JSON.parse('{"ABI version":2,"header":["time"],"functions":[{"name":"constructor","inputs":[],"outputs":[]},{"name":"initConsole","inputs":[{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"c","type":"cell"}],"outputs":[]},{"name":"scenario0","inputs":[],"outputs":[]},{"name":"scenario1","inputs":[],"outputs":[]},{"name":"deploySystemWallets","inputs":[],"outputs":[]},{"name":"deployTokenWallets","inputs":[{"name":"n","type":"uint16"}],"outputs":[]},{"name":"deployTokenWalletsWithKeys","inputs":[{"name":"keys","type":"uint256[]"}],"outputs":[]},{"name":"deployTokenWalletWithTokens","inputs":[{"name":"key","type":"uint256"},{"name":"tokens","type":"uint32"}],"outputs":[]},{"name":"mintTo","inputs":[{"name":"addr","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"burnFrom","inputs":[{"name":"addr","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"updateCI","inputs":[{"name":"i","type":"uint8"},{"name":"c","type":"cell"}],"outputs":[]},{"name":"initMember","inputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"idx","type":"uint8"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"meet","inputs":[{"name":"id","type":"uint16"},{"name":"a","type":"address"}],"outputs":[]},{"name":"updateClients","inputs":[{"name":"a","type":"address"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"getEnv","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"getEnv2","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"doTransfer","inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]}],"data":[],"events":[]}')},4:function(e,t,a){e.exports={title:"Card_title__2pVhP",block:"Card_block__BFhv9",label:"Card_label__33GJ2",input:"Card_input__1w4il",button:"Card_button__3MKN6"}},46:function(e,t,a){"use strict";a.r(t);a(31);var n=a(8),s=a.n(n),r=a(26),c=a.n(r),i=a(11),l=a(9),d=a(13),o=a(5),u=a.n(o),p=a(3),m=a.n(p),j=a.p+"static/media/logo.240b99fe.svg",b=a(0);var x=function(e){var t=e.title;return Object(b.jsxs)("header",{className:m.a.main,children:[Object(b.jsx)("div",{className:m.a.logo,children:Object(b.jsx)("h1",{children:Object(b.jsxs)("a",{className:m.a.title,href:"uax",children:[" ",Object(b.jsx)("img",{className:m.a.logoImage,src:j,width:"20px",height:"20px",alt:"logo"}),t]})})}),Object(b.jsxs)("div",{className:m.a.menu,children:[Object(b.jsx)("a",{className:(m.a.act,m.a.link),href:"uax",children:"Home"}),Object(b.jsx)("a",{className:m.a.link,href:"./demo",children:"Demo"}),Object(b.jsx)("a",{className:m.a.link,href:"./demo",children:"Help"}),Object(b.jsx)("a",{className:m.a.link,href:"./demo",children:"Contact"})]})]})},y=a(2),h=a.n(y);var _=function(e){var t=e.UAXTotal,a=e.UserTotal,n=e.BaseFee,s=e.FeeTotal,r=e.GiverTotal,c=e.Transactions;return Object(b.jsxs)("section",{className:h.a.stats,children:[Object(b.jsx)("h2",{className:h.a.title,children:"Statistics"}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"UAXTotal"}),Object(b.jsx)("span",{children:t})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"UserTotal"}),Object(b.jsx)("span",{children:a})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"BaseFee"}),Object(b.jsx)("span",{children:n})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"FeeTotal"}),Object(b.jsx)("span",{children:s})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"GiverTotal"}),Object(b.jsx)("span",{children:r})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"Transactions"}),Object(b.jsx)("span",{children:c})]})]})},O=a(27),v=a.n(O);var f=function(e){var t=e.children;return Object(b.jsx)("section",{children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{className:v.a.title,children:"Admin"}),t]})})},N=a(28),g=a.n(N),T=a(1),w=a.n(T),k=a(7),A=a(10),W=a(29),C={abi:a(30)},B={abi:W},S=function(e,t){return new A.Account(B,{address:t,client:e})},H=function(){var e=Object(k.a)(w.a.mark((function e(t,a,n,s){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"0:ce29361989554084103fc98e306300c0fa6a51adfe5556636c5b5ca97a992063",r=new A.Account(C,{consoleAddr:"0:ce29361989554084103fc98e306300c0fa6a51adfe5556636c5b5ca97a992063",client:t}),e.next=4,r.run("doTransfer",{to:n,from:a,val:s});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,a,n,s){return e.apply(this,arguments)}}(),L={getBalance:function(){var e=Object(k.a)(w.a.mark((function e(t,a){var n,s,r,c,i;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=S(t,a),e.next=3,n.runLocal("_balance");case 3:return s=e.sent,r=s.decoded.output._balance,e.next=7,t.net.query_collection({collection:"accounts",filter:{id:{eq:a}},result:"balance"});case 7:return c=e.sent.result[0].balance,i=parseInt(c,16)/Math.pow(10,9),e.abrupt("return",{uax:r,gas:i.toString()});case 10:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),makeWalletWrapper:S,doTransfer:H};var I=function(e){var t=e.title,a=e.client,n=e.address,s=e.setBalance;return Object(b.jsx)("button",{className:g.a.button,type:"button",onClick:function(){return L.getBalance(a,n).then((function(e){return s(n,e)}))},children:t})},E=a(6),F=a.n(E);var G=function(e){var t=e.address,a=e.balance,n=t.slice(0,7)+"..."+t.slice(-4,0);return Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{className:F.a.title,children:"Wallet"}),Object(b.jsxs)("div",{className:F.a.wallet,children:[Object(b.jsxs)("div",{className:F.a.ballance,children:[Object(b.jsx)("div",{className:F.a.info,children:"BALANCE"}),Object(b.jsx)("p",{className:F.a.value,children:a.uax}),Object(b.jsx)("p",{className:F.a.value,children:a.gas})]}),Object(b.jsx)("a",{href:"copy",children:Object(b.jsxs)("div",{className:F.a.yadd,children:["Copy your address: ",n]})})]})]})},U=a(4),J=a.n(U);var D=function(e){var t=e.title,a=e.label,n=e.buttonText,s=e.client,r=e.from,c=e.to,i=e.value,l=e.children;function d(){return(d=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,L.doTransfer(s,r,c,i);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(b.jsxs)("section",{className:J.a.card,children:[Object(b.jsx)("h2",{className:J.a.title,children:t}),Object(b.jsxs)("form",{className:J.a.block,children:[Object(b.jsx)("label",{className:J.a.label,children:"Recipient"}),Object(b.jsx)("input",{className:J.a.input,type:"text",placeholder:"Enter recipient 0:address",defaultValue:c}),Object(b.jsx)("label",{className:J.a.label,children:a}),Object(b.jsx)("input",{className:J.a.input,type:"text",placeholder:"Enter amount"}),l,Object(b.jsx)("button",{className:J.a.button,type:"submit",onClick:function(e){return d.apply(this,arguments)},children:n})]})]})};var M=function(e){var t,a=e.client,s="0:922ce341cf0b9d74addb4e9d480fde32ea42e57bc24108102ecd4eef2ed2e21f",r="0:a77f5f511eb09331c7da77244d9127b0ad1b53860494e6b67f90d21701ac839d",c=Object(n.useState)((t={},Object(l.a)(t,s,{address:s,uax:"-",gas:"-"}),Object(l.a)(t,r,{address:r,uax:"-",gas:"-"}),t)),o=Object(d.a)(c,2),p=o[0],m=o[1],j=function(e,t){console.log(t),m(Object(i.a)(Object(i.a)({},p),{},Object(l.a)({},e,Object(i.a)(Object(i.a)({},p[e]),{},{uax:t.uax,gas:t.gas}))))};return Object(b.jsx)("main",{className:u.a.main,children:Object(b.jsxs)("div",{className:u.a.desk,children:[Object(b.jsx)(x,{title:"Dashboard"}),Object(b.jsxs)("div",{className:u.a.flex,children:[Object(b.jsxs)("aside",{className:u.a.aside,children:[Object(b.jsx)(_,{UAXTotal:"8,000,000",UserTotal:"537",BaseFee:"12",FeeTotal:"23,889",GiverTotal:"2,000,000",Transactions:"4,221"}),Object(b.jsxs)(f,{children:[Object(b.jsx)(I,{title:"Update wallet 1",client:a,address:s,setBalance:j}),Object(b.jsx)(I,{title:"Update wallet 2",client:a,address:r,setBalance:j})]})]}),Object(b.jsxs)("div",{className:u.a.page,children:[Object(b.jsxs)("div",{className:u.a.wallet,children:[Object(b.jsx)(G,{address:s,balance:p[s]}),Object(b.jsx)(D,{title:"Transfer",label:"Value (uax)",buttonText:"Send",client:a,from:s,to:r,value:1})]}),Object(b.jsxs)("div",{className:u.a.wallet,children:[Object(b.jsx)(G,{address:r,balance:p[r]}),Object(b.jsx)(D,{title:"Transfer",label:"Value (uax)",buttonText:"Send",client:a,from:r,to:s,value:1})]})]})]})]})})},V=a(19);Object(V.b)({binaryURL:"wasm/tonclient.wasm"}),A.TonClient.useBinaryLibrary(V.a);var K=new A.TonClient({network:{server_address:"net.ton.dev"}});c.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(M,{client:K})}),document.getElementById("root"))},5:function(e,t,a){e.exports={main:"App_main__3ZkGI",desk:"App_desk__2dGs9",flex:"App_flex__2WNdQ",aside:"App_aside__HVdR9",page:"App_page__CKP-2",wallet:"App_wallet__3O9GF"}},6:function(e,t,a){e.exports={wallet:"Wallet_wallet__1Grsq",title:"Wallet_title__1Mc98",ballance:"Wallet_ballance__3ED42",info:"Wallet_info__YW5pO",value:"Wallet_value__1ayvN",yadd:"Wallet_yadd__yIG7m"}}},[[46,1,2]]]);
//# sourceMappingURL=main.715aaa7a.chunk.js.map