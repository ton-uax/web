(this["webpackJsonpuax-demo"]=this["webpackJsonpuax-demo"]||[]).push([[0],{11:function(e,t,a){e.exports={main:"Header_main__2r9vH",logo:"Header_logo__3_SJs",logoImage:"Header_logoImage__2KwYz",title:"Header_title__3SH2Q",menu:"Header_menu__BQHSW",link:"Header_link__2wI74"}},14:function(e,t,a){e.exports={block:"WalletForm_block__1lXM_",label:"WalletForm_label__1jx59",input:"WalletForm_input__3bFU3",button:"WalletForm_button__23D-y"}},15:function(e,t,a){e.exports={wallet:"Wallet_wallet__1Grsq",ballance:"Wallet_ballance__3ED42",info:"Wallet_info__YW5pO",value:"Wallet_value__1ayvN",yadd:"Wallet_yadd__yIG7m"}},18:function(e,t,a){e.exports={main:"App_main__3ZkGI",desk:"App_desk__2dGs9",flex:"App_flex__2WNdQ",aside:"App_aside__HVdR9",page:"App_page__CKP-2",col:"App_col__3qgzs"}},39:function(e,t,a){e.exports={col:"Col_col__3hcbS"}},41:function(e,t,a){e.exports={coltitle:"ColTitle_coltitle__1lCZ1"}},42:function(e){e.exports=JSON.parse('{"ABI version":2,"header":["time"],"functions":[{"name":"constructor","inputs":[{"name":"id","type":"uint16"}],"outputs":[]},{"name":"setupTokenWallet","inputs":[{"name":"id","type":"uint16"},{"name":"tex","type":"address"},{"name":"eventLog","type":"address"}],"outputs":[]},{"name":"credit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"debit","inputs":[{"name":"tid","type":"uint64"},{"name":"n","type":"uint32"}],"outputs":[]},{"name":"confirm","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"deny","inputs":[{"name":"tid","type":"uint64"}],"outputs":[]},{"name":"buyTokens","inputs":[{"name":"amount","type":"uint32"}],"outputs":[]},{"name":"transferTokensDirectly","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokens","inputs":[{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"transferTokensToFriend","inputs":[{"name":"id","type":"uint16"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"initMember","inputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"idx","type":"uint8"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"meet","inputs":[{"name":"id","type":"uint16"},{"name":"a","type":"address"}],"outputs":[]},{"name":"updateClients","inputs":[{"name":"a","type":"address"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"getEnv","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"getEnv2","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"_balance","inputs":[],"outputs":[{"name":"_balance","type":"uint32"}]}],"data":[],"events":[]}')},43:function(e){e.exports=JSON.parse('{"ABI version":2,"header":["time"],"functions":[{"name":"constructor","inputs":[],"outputs":[]},{"name":"initConsole","inputs":[{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"c","type":"cell"}],"outputs":[]},{"name":"scenario0","inputs":[],"outputs":[]},{"name":"scenario1","inputs":[],"outputs":[]},{"name":"deploySystemWallets","inputs":[],"outputs":[]},{"name":"deployTokenWallets","inputs":[{"name":"n","type":"uint16"}],"outputs":[]},{"name":"deployTokenWalletsWithKeys","inputs":[{"name":"keys","type":"uint256[]"}],"outputs":[]},{"name":"deployTokenWalletWithTokens","inputs":[{"name":"key","type":"uint256"},{"name":"tokens","type":"uint32"}],"outputs":[]},{"name":"mintTo","inputs":[{"name":"addr","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"burnFrom","inputs":[{"name":"addr","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]},{"name":"updateCI","inputs":[{"name":"i","type":"uint8"},{"name":"c","type":"cell"}],"outputs":[]},{"name":"initMember","inputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"},{"name":"idx","type":"uint8"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"meet","inputs":[{"name":"id","type":"uint16"},{"name":"a","type":"address"}],"outputs":[]},{"name":"updateClients","inputs":[{"name":"a","type":"address"},{"name":"id","type":"uint16"}],"outputs":[]},{"name":"getEnv","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"getEnv2","inputs":[],"outputs":[{"name":"console","type":"address"},{"name":"eventLog","type":"address"},{"name":"root","type":"address"},{"name":"tex","type":"address"},{"name":"dashboard","type":"address"}]},{"name":"doTransfer","inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"val","type":"uint32"}],"outputs":[]}],"data":[],"events":[]}')},44:function(e,t,a){e.exports={matrix:"Matrix_matrix__3fyU2"}},45:function(e,t,a){e.exports={smallwallet:"SmallWallet_smallwallet__czxnJ"}},6:function(e,t,a){e.exports={row:"Stats_row__30pvA",name:"Stats_name__4A6EJ"}},70:function(e,t,a){"use strict";a.r(t);a(46);var n=a(1),s=a.n(n),r=a(38),c=a.n(r),i=a(12),d=a(18),l=a.n(d),u=a(3),o=a(39),p=a.n(o),m=a(0);var j=function(e){var t=e.children;return Object(m.jsx)("div",{className:p.a.col,children:t})},b=a(11),x=a.n(b),f=a.p+"static/media/logo.240b99fe.svg";var h=function(e){var t=e.title;return Object(m.jsxs)("header",{className:x.a.main,children:[Object(m.jsx)("div",{className:x.a.logo,children:Object(m.jsx)("h1",{children:Object(m.jsxs)(i.b,{to:"/",className:x.a.title,children:[" ",Object(m.jsx)("img",{className:x.a.logoImage,src:f,width:"20px",height:"20px",alt:"logo"}),t]})})}),Object(m.jsxs)("div",{className:x.a.menu,children:[Object(m.jsx)(i.b,{to:"/",className:(x.a.act,x.a.link),href:"uax",children:"Home"}),Object(m.jsx)(i.b,{to:"/demo1",className:x.a.link,children:"Demo 1"}),Object(m.jsx)(i.b,{to:"/demo2",className:x.a.link,children:"Demo 2"})]})]})},y=a(41),O=a.n(y);var v=function(e){var t=e.title;return Object(m.jsx)("div",{className:O.a.coltitle,children:t})},_=a(6),N=a.n(_);var w=function(e){var t=e.UAXTotal,a=e.UserTotal,n=e.BaseFee,s=e.FeeTotal,r=e.GiverTotal,c=e.Transactions;return Object(m.jsxs)("section",{className:N.a.stats,children:[Object(m.jsx)(v,{title:"Stats"}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"UAXTotal"}),Object(m.jsx)("span",{children:t})]}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"UserTotal"}),Object(m.jsx)("span",{children:a})]}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"BaseFee"}),Object(m.jsx)("span",{children:n})]}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"FeeTotal"}),Object(m.jsx)("span",{children:s})]}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"GiverTotal"}),Object(m.jsx)("span",{children:r})]}),Object(m.jsxs)("div",{className:N.a.row,children:[Object(m.jsx)("p",{className:N.a.name,children:"Transactions"}),Object(m.jsx)("span",{children:c})]})]})};var g=function(e){var t=e.children;return Object(m.jsx)("section",{children:Object(m.jsxs)("div",{children:[Object(m.jsx)(v,{title:"Admin"}),t]})})},k=a(2),T=a.n(k),W=a(5),A=a(14),S=a.n(A),B=a(29),F=a(42),I={abi:a(43)},L={abi:F},C=function(e,t){return new B.Account(L,{address:t,client:e})},U=function(){var e=Object(W.a)(T.a.mark((function e(t,a,n,s){var r;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"0:b22d597168df97e54bad718f942a1f0d5b2c768bcf81436ddacf531bf0597c63",r=new B.Account(I,{address:"0:b22d597168df97e54bad718f942a1f0d5b2c768bcf81436ddacf531bf0597c63",client:t}),e.next=4,r.run("doTransfer",{to:n,from:a,val:s});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,a,n,s){return e.apply(this,arguments)}}(),H=function(){var e=Object(W.a)(T.a.mark((function e(t,a){var n,s;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=C(t,a),e.next=3,n.runLocal("_balance");case 3:return s=e.sent,e.abrupt("return",s.decoded.output._balance);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),E=function(){var e=Object(W.a)(T.a.mark((function e(t,a){var n,s;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.net.query_collection({collection:"accounts",filter:{id:{eq:a}},result:"balance"});case 2:return n=e.sent.result[0].balance,s=parseInt(n,16)/Math.pow(10,9),e.abrupt("return",s.toString());case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),D={getBalance:function(){var e=Object(W.a)(T.a.mark((function e(t,a){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H(t,a);case 2:return e.t0=e.sent,e.next=5,E(t,a);case 5:return e.t1=e.sent,e.abrupt("return",{uax:e.t0,ton:e.t1});case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),getTONBalance:E,getUAXBalance:H,makeWalletWrapper:C,doTransfer:U};var G=function(e){var t=e.client,a=e.from,n=e.to,r=e.children,c=s.a.createRef(),i=s.a.createRef();function d(){return(d=Object(W.a)(T.a.mark((function e(n){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,D.doTransfer(t,a,c.current.value,parseInt(i.current.value));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(m.jsxs)("form",{className:S.a.block,onSubmit:function(e){return d.apply(this,arguments)},children:[Object(m.jsx)("label",{className:S.a.label,children:"Recipient"}),Object(m.jsx)("input",{className:S.a.input,type:"text",placeholder:"0:...",defaultValue:n,ref:c}),Object(m.jsx)("label",{className:S.a.label,children:"Value"}),Object(m.jsx)("input",{className:S.a.input,type:"text",placeholder:"123.45",ref:i}),r,Object(m.jsx)("button",{className:S.a.button,type:"submit",children:"Send"})]})},J=a(15),M=a.n(J);var X=function(e){var t=e.client,a=e.address,n=e.balance,s=a.slice(0,7)+"..."+a.slice(-4,0);return Object(m.jsxs)("div",{className:M.a.wallet,children:[Object(m.jsxs)("div",{className:M.a.ballance,children:[Object(m.jsx)("div",{className:M.a.info,children:"BALANCE"}),Object(m.jsx)("p",{className:M.a.value,children:n?n.uax:"-"}),Object(m.jsx)("p",{className:M.a.value,children:n?n.ton:"-"})]}),Object(m.jsx)("a",{href:"copy",children:Object(m.jsxs)("div",{className:M.a.yadd,children:["Copy your address: ",s]})}),Object(m.jsx)(G,{client:t,from:a})]})},R=a(44),q=a.n(R);var z=function(e){var t=e.children;return Object(m.jsx)("div",{className:q.a.matrix,children:t})},K=a(45),Q=a.n(K);var V=function(e){var t=e.address,a=e.uax,n=e.ton;return Object(m.jsxs)("div",{className:Q.a.smallwallet,children:[Object(m.jsx)("p",{children:t}),Object(m.jsx)("p",{children:a}),Object(m.jsx)("p",{children:n})]})},P=a(16),Y=a(10),Z=a(17);var $=function(e){var t=e.client,a="0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148",s="0:26675a7185708c1e277c224f3afc70aff040484d372bbeeac455d99fdfc6a201",r=Object(n.useState)(!1),c=Object(Z.a)(r,2),i=c[0],d=c[1],l=Object(n.useState)({}),u=Object(Z.a)(l,2),o=u[0],p=u[1];return Object(n.useEffect)((function(){function e(){return(e=Object(W.a)(T.a.mark((function e(){var n,r,c,i,l;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([D.getBalance(t,a),D.getBalance(t,s)]);case 2:r=e.sent,c=Object(Z.a)(r,2),i=c[0],l=c[1],p(Object(Y.a)(Object(Y.a)({},o),{},(n={},Object(P.a)(n,a,Object(Y.a)(Object(Y.a)({},o[a]),{},{uax:i.uax,ton:i.ton})),Object(P.a)(n,s,Object(Y.a)(Object(Y.a)({},o[s]),{},{uax:l.uax,ton:l.ton})),n))),d(!0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function n(){return(n=Object(W.a)(T.a.mark((function e(){var n,r,c;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=function(){return(c=Object(W.a)(T.a.mark((function e(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.net.unsubscribe({handle:n});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)},r=function(){return c.apply(this,arguments)},e.next=4,t.net.subscribe_collection({collection:"accounts",filter:{id:{in:[a,s]}},result:"id,balance"},function(){var e=Object(W.a)(T.a.mark((function e(a){var n,s,r;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.result.id,e.next=3,D.getUAXBalance(t,n);case 3:s=e.sent,r=(parseInt(a.result.balance)/Math.pow(10,9)).toString(),p(Object(Y.a)(Object(Y.a)({},o),{},Object(P.a)({},n,Object(Y.a)(Object(Y.a)({},o[n]),{},{uax:s,ton:r}))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:return n=e.sent.handle,e.abrupt("return",(function(){return r()}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}if(!i)return function(){e.apply(this,arguments)}(),function(){return n.apply(this,arguments)}()})),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(j,{children:Object(m.jsx)(X,{client:t,address:a,balance:o[a]})}),Object(m.jsx)(j,{children:Object(m.jsx)(X,{client:t,address:s,balance:o[s]})})]})};var ee=function(e){var t=e.client;return Object(m.jsx)("main",{className:l.a.main,children:Object(m.jsxs)("div",{className:l.a.desk,children:[Object(m.jsx)(h,{title:"UAX"}),Object(m.jsxs)("div",{className:l.a.flex,children:[Object(m.jsxs)("aside",{className:l.a.aside,children:[Object(m.jsx)(w,{UAXTotal:"8,000,000",UserTotal:"537",BaseFee:"12",FeeTotal:"23,889",GiverTotal:"2,000,000",Transactions:"4,221"}),Object(m.jsx)(g,{})]}),Object(m.jsx)("div",{className:l.a.page,children:Object(m.jsxs)(u.c,{children:[Object(m.jsx)(u.a,{exact:!0,path:"/"}),Object(m.jsx)(u.a,{path:"/demo1",children:Object(m.jsx)($,{client:t})}),Object(m.jsxs)(u.a,{path:"/demo2",children:[Object(m.jsxs)(j,{children:[Object(m.jsx)(v,{title:"Wallet"}),Object(m.jsx)(X,{client:t,address:"0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148",balance:{ton:"2.34",uax:"123"}})]}),Object(m.jsxs)(j,{children:[Object(m.jsx)(v,{title:"Desk"}),Object(m.jsxs)(z,{children:[Object(m.jsx)(V,{address:"address",uax:123,ton:456}),Object(m.jsx)(V,{address:"address",uax:123,ton:456}),Object(m.jsx)(V,{address:"address",uax:123,ton:456}),Object(m.jsx)(V,{address:"address",uax:123,ton:456}),Object(m.jsx)(V,{address:"address",uax:123,ton:456})]})]}),Object(m.jsx)(j,{children:Object(m.jsx)(v,{title:"Log"})})]})]})})]})]})})},te=a(21),ae=a(30);Object(ae.b)({binaryURL:"wasm/tonclient.wasm"}),te.TonClient.useBinaryLibrary(ae.a);var ne=new te.TonClient({network:{server_address:"net.ton.dev"}});c.a.render(Object(m.jsx)(s.a.StrictMode,{children:Object(m.jsx)(i.a,{children:Object(m.jsx)(ee,{client:ne})})}),document.getElementById("root"))}},[[70,1,2]]]);
//# sourceMappingURL=main.3799f0c1.chunk.js.map