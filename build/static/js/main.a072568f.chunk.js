(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=(t(20),t(2)),l=function(e){var n=e.persons,t=e.submit;return n.map(function(e){return r.a.createElement("li",{key:e.name},e.name+" "+e.number," ",r.a.createElement("button",{onClick:t,value:e.id},"delete"))})},i=function(e){return r.a.createElement("form",{onSubmit:e.submit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.nameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newPhone,onChange:e.phoneChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"input shown with ",r.a.createElement("input",{value:e.searchValue,onChange:e.searchHandler})))},s=t(3),f=t.n(s),d="/api/persons",b=function(){return f.a.get(d).then(function(e){return e.data})},h=function(e){return f.a.post(d,e).then(function(e){return e.data})},v=function(e,n){return f.a.put("".concat(d,"/").concat(e),n)},p=function(e){var n=d+"/"+e;return f.a.delete(n).then(function(e){return e.data})},E=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{className:"notifySuccess"},n)},g=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([{name:"Arto Hellas",number:"040-1234567"}]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),f=s[0],d=s[1],w=Object(a.useState)(""),j=Object(o.a)(w,2),O=j[0],y=j[1],C=Object(a.useState)(""),S=Object(o.a)(C,2),k=S[0],N=S[1],I=Object(a.useState)(""),P=Object(o.a)(I,2),A=P[0],D=P[1],H=Object(a.useState)(""),J=Object(o.a)(H,2),T=J[0],V=J[1];Object(a.useEffect)(function(){b().then(function(e){u(e)})},[]);var x=t.filter(function(e){return e.name.includes(k)});return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:A}),r.a.createElement(g,{message:T}),r.a.createElement(m,{searchValue:k,searchHandler:function(e){console.log(e.target.value),N(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(i,{submit:function(e){e.preventDefault();var n=t.map(function(e){return e.name}),a=t.find(function(e){return e.name==f}),r={name:f,number:O};n.includes(f)?window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))?v(a.id,r).then(function(e){u(t.map(function(e){return e.name!=r.name?e:r})),D("Added ".concat(f)),setTimeout(function(){D("")},5e3)}).catch(function(e){V("Information of ".concat(f," has already been removed from server")),y(""),d("")}):(d(""),y("")):(console.log("we went thru baby"),h(r).then(function(e){u(t.concat(e)),d(""),y("")}),D("Added ".concat(f)),setTimeout(function(){D("")},5e3))},newName:f,newPhone:O,nameChange:function(e){d(e.target.value)},phoneChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",null,r.a.createElement(l,{key:"Persons",persons:x,submit:function(e){e.preventDefault();var n=t.find(function(n){return n.id==parseInt(e.target.value)});window.confirm("Delete ".concat(n.name," ?"))&&(p(e.target.value),u(t.filter(function(n){return n.id!==parseInt(e.target.value)})))}})))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a072568f.chunk.js.map