import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c as p,a as s,b as n,e as c,w as i,d as l}from"./app-531015dd.js";const u={},r=s("h2",{id:"基本介绍",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#基本介绍","aria-hidden":"true"},"#"),n(" 基本介绍")],-1),d=s("code",null,"internal\\library\\ufile",-1),k=s("br",null,null,-1),m=s("code",null,"id",-1),v=s("code",null,"1,2,3",-1),_=l(`<div class="hint-container warning"><p class="hint-container-title">注意</p><p>返回给前端的文件路径，请使用相对路径，交给前端拼接。</p></div><h2 id="附件解析" tabindex="-1"><a class="header-anchor" href="#附件解析" aria-hidden="true">#</a> 附件解析</h2><p>需要将数据库中保存的文件 <code>id</code> 字符串，解析成前端需要的数据格式，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 获取 list</span>
err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">ScanAndCount</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>list<span class="token punctuation">,</span> <span class="token operator">&amp;</span>count<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>
<span class="token comment">// 循环 list，单行记录赋值</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> list <span class="token punctuation">{</span>
  <span class="token comment">// ... 其他赋值逻辑</span>

  idCardIds <span class="token operator">:=</span> gconv<span class="token punctuation">.</span><span class="token function">Int64s</span><span class="token punctuation">(</span>gstr<span class="token punctuation">.</span><span class="token function">SplitAndTrim</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>IdCardIds<span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  v<span class="token punctuation">.</span>IdCardList<span class="token punctuation">,</span> err <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">SysAttachment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetListByIds</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> idCardIds<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function h(b,f){const a=e("RouterLink");return o(),p("div",null,[r,s("p",null,[n("文件上传核心代码在 "),d,k,n(" 保存附件时，前端会提交以逗号隔开的 "),m,n(" 字符串，例如 "),v,n("，后端在返回前端附件数据时需要进行解析，"),c(a,{to:"/backend/component/upload.html#%E9%99%84%E4%BB%B6%E8%A7%A3%E6%9E%90"},{default:i(()=>[n("附件解析")]),_:1}),n("。")]),_])}const w=t(u,[["render",h],["__file","upload.html.vue"]]);export{w as default};