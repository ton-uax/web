(this.webpackJsonpproject_v2=this.webpackJsonpproject_v2||[]).push([[0],{1:function(e,a,t){e.exports={title:"Stats_title__2lySv",row:"Stats_row__30pvA",name:"Stats_name__4A6EJ"}},27:function(e,a,t){e.exports={title:"AdminWallet_title__2kpD4"}},28:function(e,a,t){e.exports={button:"AdminBtn_button__1CAug"}},29:function(e){e.exports=JSON.parse('{"ABI version":2,"header":["time"],"functions":[{"name":"constructor","inputs":[{"name":"id","type":"uint16"}],"outputs":[]},{"name":"setupTokenWallet","inputs":[{"name":"id","type":"uint16"},{"name":"tex","type":"address"},{"name":"eventLog","type":"address"}],"outputs":[]},{"name":"credit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"debit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"confirm","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"deny","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"buyTokens","inputs":[{"name":"amount","type":"uint32"}],"outputs":[]},{"name":"transferTokensDirectly","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokens","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokensToFriend","inputs":[{"name":"id","type":"uint16"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"initMember","inputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"idx","type":"uint8"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"meet","inputs":[{"name":"id","type":"uint16"},{"name":"a","type":"address"}],"outputs":[]},{"name":"updateClients","inputs":[{"name":"a","type":"address"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"getEnv","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"getEnv2","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"_balance","inputs":[],"outputs":[{"name":"_balance","type":"uint32"}]}],"data":[],"events":[]}')},3:function(e,a,t){e.exports={main:"Header_main__2r9vH",logo:"Header_logo__3_SJs",logoImage:"Header_logoImage__2KwYz",title:"Header_title__3SH2Q",menu:"Header_menu__BQHSW",link:"Header_link__2wI74"}},4:function(e,a,t){e.exports={title:"Card_title__2pVhP",block:"Card_block__BFhv9",label:"Card_label__33GJ2",input:"Card_input__1w4il",button:"Card_button__3MKN6"}},45:function(e,a,t){"use strict";t.r(a);t(30);var s=t(7),n=t.n(s),c=t(26),l=t.n(c),r=t(11),i=t(9),d=t(13),o=t(5),u=t.n(o),p=t(3),j=t.n(p),m=t.p+"static/media/logo.240b99fe.svg",b=t(0);var x=function(e){var a=e.title;return Object(b.jsxs)("header",{className:j.a.main,children:[Object(b.jsx)("div",{className:j.a.logo,children:Object(b.jsx)("h1",{children:Object(b.jsxs)("a",{className:j.a.title,href:"uax",children:[" ",Object(b.jsx)("img",{className:j.a.logoImage,src:m,width:"20px",height:"20px",alt:"logo"}),a]})})}),Object(b.jsxs)("div",{className:j.a.menu,children:[Object(b.jsx)("a",{className:(j.a.act,j.a.link),href:"uax",children:"Home"}),Object(b.jsx)("a",{className:j.a.link,href:"./demo",children:"Demo"}),Object(b.jsx)("a",{className:j.a.link,href:"./demo",children:"Help"}),Object(b.jsx)("a",{className:j.a.link,href:"./demo",children:"Contact"})]})]})},_=t(1),h=t.n(_);var O=function(e){var a=e.UAXTotal,t=e.UserTotal,s=e.BaseFee,n=e.FeeTotal,c=e.GiverTotal,l=e.Transactions;return Object(b.jsxs)("section",{className:h.a.stats,children:[Object(b.jsx)("h2",{className:h.a.title,children:"Statistics"}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"UAXTotal"}),Object(b.jsx)("span",{children:a})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"UserTotal"}),Object(b.jsx)("span",{children:t})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"BaseFee"}),Object(b.jsx)("span",{children:s})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"FeeTotal"}),Object(b.jsx)("span",{children:n})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"GiverTotal"}),Object(b.jsx)("span",{children:c})]}),Object(b.jsxs)("div",{className:h.a.row,children:[Object(b.jsx)("p",{className:h.a.name,children:"Transactions"}),Object(b.jsx)("span",{children:l})]})]})},v=t(27),y=t.n(v);var f=function(e){var a=e.children;return Object(b.jsx)("section",{children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{className:y.a.title,children:"Admin"}),a]})})},N=t(28),g=t.n(N),w=t(2),k=t.n(w),T=t(8),B=t(10),A={abi:t(29)},W=function(e,a){return new B.Account(A,{address:a,client:e})},C={getBalance:function(){var e=Object(T.a)(k.a.mark((function e(a,t){var s,n,c,l,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=W(a,t),e.next=3,s.runLocal("_balance");case 3:return n=e.sent,c=n.decoded.output._balance,e.next=7,a.net.query_collection({collection:"accounts",filter:{id:{eq:t}},result:"balance"});case 7:return l=e.sent.result[0].balance,r=parseInt(l,16)/Math.pow(10,9),e.abrupt("return",{address:t,uax:c,gas:r.toString()});case 10:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),makeWalletWrapper:W};var S=function(e){var a=e.title,t=e.client,s=e.address,n=e.setBalance;return Object(b.jsx)("button",{className:g.a.button,type:"button",onClick:function(){return C.getBalance(t,s).then(n)},children:a})},H=t(6),F=t.n(H);var G=function(e){var a=e.address,t=e.balance,s=a.slice(0,7)+"..."+a.slice(-4,0);return Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{className:F.a.title,children:"Wallet"}),Object(b.jsxs)("div",{className:F.a.wallet,children:[Object(b.jsxs)("div",{className:F.a.ballance,children:[Object(b.jsx)("div",{className:F.a.info,children:"BALANCE"}),Object(b.jsx)("p",{className:F.a.value,children:t.uax}),Object(b.jsx)("p",{className:F.a.value,children:t.gas})]}),Object(b.jsx)("a",{href:"copy",children:Object(b.jsxs)("div",{className:F.a.yadd,children:["Copy your address: ",s]})})]})]})},I=t(4),U=t.n(I);var L=function(e){var a=e.title,t=e.label,s=e.buttonText,n=e.client,c=e.from,l=e.to,r=e.value,i=e.setBalance,d=e.children;function o(){return(o=Object(T.a)(k.a.mark((function e(a){var t,s,d,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),t=C.makeWalletWrapper(n,c),e.next=4,t.run("transferTokens",{to:l,val:r});case 4:return s=e.sent,console.log(s),e.next=8,C.getBalance(n,c);case 8:return d=e.sent,e.next=11,C.getBalance(n,l);case 11:o=e.sent,i(d),i(o);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(b.jsxs)("section",{className:U.a.card,children:[Object(b.jsx)("h2",{className:U.a.title,children:a}),Object(b.jsxs)("form",{className:U.a.block,children:[Object(b.jsx)("label",{className:U.a.label,children:"Recipient (hash)"}),Object(b.jsx)("input",{className:U.a.input,type:"text",placeholder:"Enter recipient address",defaultValue:l}),Object(b.jsx)("label",{className:U.a.label,children:t}),Object(b.jsx)("input",{className:U.a.input,type:"text",placeholder:"1,000"}),d,Object(b.jsx)("button",{className:U.a.button,type:"submit",onClick:function(e){return o.apply(this,arguments)},children:s})]})]})};var E=function(e){var a,t=e.client,n="0:911d8d474b584cb4a3eb21a02c70cd2172054e2455d2472a7151b7986ffbe0d6",c="0:c892a0387f157153cea7d7b244c6c54ded126ade017bd2c4feb0d3044a643b52",l=Object(s.useState)((a={},Object(i.a)(a,n,{address:n,uax:"-",gas:"-"}),Object(i.a)(a,c,{address:c,uax:"-",gas:"-"}),a)),o=Object(d.a)(l,2),p=o[0],j=o[1],m=function(e){var a=e.address_,t=e.uax_,s=e.gas_;console.log(a,t,s),j(Object(r.a)(Object(r.a)({},p),{},Object(i.a)({},a,Object(r.a)(Object(r.a)({},p[a]),{},{address:a,uax:t,gas:s}))))};return Object(b.jsx)("main",{className:u.a.main,children:Object(b.jsxs)("div",{className:u.a.desk,children:[Object(b.jsx)(x,{title:"Dashboard"}),Object(b.jsxs)("div",{className:u.a.flex,children:[Object(b.jsxs)("aside",{className:u.a.aside,children:[Object(b.jsx)(O,{UAXTotal:"8,000,000",UserTotal:"537",BaseFee:"12",FeeTotal:"23,889",GiverTotal:"2,000,000",Transactions:"4,221"}),Object(b.jsxs)(f,{children:[Object(b.jsx)(S,{title:"Update wallet 1",client:t,address:n,setBalance:m}),Object(b.jsx)(S,{title:"Update wallet 2",client:t,address:c,setBalance:m})]})]}),Object(b.jsxs)("div",{className:u.a.page,children:[Object(b.jsxs)("div",{className:u.a.wallet,children:[Object(b.jsx)(G,{address:n,balance:p[n]}),Object(b.jsx)(L,{title:"Transfer",label:"Value (uax)",buttonText:"Send",client:t,from:n,to:c,value:1,setBalance:m})]}),Object(b.jsxs)("div",{className:u.a.wallet,children:[Object(b.jsx)(G,{address:c,balance:p[c]}),Object(b.jsx)(L,{title:"Transfer",label:"Value (uax)",buttonText:"Send",client:t,from:c,to:n,value:1,setBalance:m})]})]})]})]})})},D=t(19);Object(D.b)({binaryURL:"wasm/tonclient.wasm"}),B.TonClient.useBinaryLibrary(D.a);var J=new B.TonClient({network:{server_address:"net.ton.dev"}});l.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(E,{client:J})}),document.getElementById("root"))},5:function(e,a,t){e.exports={main:"App_main__3ZkGI",desk:"App_desk__2dGs9",flex:"App_flex__2WNdQ",aside:"App_aside__HVdR9",page:"App_page__CKP-2",wallet:"App_wallet__3O9GF"}},6:function(e,a,t){e.exports={wallet:"Wallet_wallet__1Grsq",title:"Wallet_title__1Mc98",ballance:"Wallet_ballance__3ED42",info:"Wallet_info__YW5pO",value:"Wallet_value__1ayvN",yadd:"Wallet_yadd__yIG7m"}}},[[45,1,2]]]);
//# sourceMappingURL=main.1ce2aac5.chunk.js.map