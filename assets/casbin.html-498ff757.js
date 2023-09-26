import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as i,a as n,b as s,e as c,d as l}from"./app-531015dd.js";const p={},r=n("h2",{id:"基本介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基本介绍","aria-hidden":"true"},"#"),s(" 基本介绍")],-1),d=n("p",null,"casbin 是一个强大的、高效的开源访问控制框架，其权限管理模型支持多种访问控制模型。",-1),u=n("code",null,"RBAC",-1),k={href:"https://casbin.org/docs/rbac/",target:"_blank",rel:"noopener noreferrer"},m=l(`<h3 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h3><p>实际只用到了角色-权限部分：</p><ul><li>一个角色对应多个菜单 <ul><li>绑定关系通过 <code>admin_role_menu</code> 表来维护</li></ul></li><li>一个菜单可以定义多个权限点 <ul><li>具有任意一个权限点即可访问该菜单</li><li>权限点为了唯一性，使用 api 地址</li><li>菜单表 <code>admin_menu</code> 字段 <code>permissions</code>，以 <code>,</code> 分割 <ul><li>例如 <code>/admin/user/list, /admin/user/add</code></li></ul></li></ul></li><li>加载到 <code>casbin</code> 中的权限格式为 <code>角色-权限点-请求Method</code><ul><li>例如 <code>admin, /admin/user/list, GET</code></li></ul></li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果想要修改以上逻辑，可以修改 <code>internal\\library\\casbin\\enforcer.go</code> 文件中的 <code>loadPermissions</code> 方法。<br> 该方法用于将用户、角色、权限关系加载到 <code>casbin</code> 中。</p></div><h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h3><p>判断用户是否有权限访问 api 接口，该方法在鉴权中间件调用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;ddtd/internal/library/casbin&quot;</span>
<span class="token punctuation">)</span>
<span class="token comment">/**
 * @Description: 验证访问权限
 * @param ctx
 * @param path api路径
 * @param method 请求方法
 * @return bool 是否有权限
 */</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>sAdminRole<span class="token punctuation">)</span> <span class="token function">VerifyAccess</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> path<span class="token punctuation">,</span> method <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  ok<span class="token punctuation">,</span> err <span class="token operator">:=</span> casbin<span class="token punctuation">.</span>Enforcer<span class="token punctuation">.</span><span class="token function">Enforce</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>RoleKey<span class="token punctuation">,</span> path<span class="token punctuation">,</span> method<span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    g<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Warningf</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">&quot;admin Verify Enforce  err:%+v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
	<span class="token keyword">return</span> ok
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function b(v,h){const a=t("ExternalLinkIcon");return o(),i("div",null,[r,d,n("p",null,[s("本项目使用 casbin 作为权限管理框架，使用的是其 "),u,s(" 模型，通过权限关联角色、角色关联用户的方法来间接地赋予用户权限，从而实现用户与权限的解耦。"),n("a",k,[s("https://casbin.org/docs/rbac/"),c(a)])]),m])}const g=e(p,[["render",b],["__file","casbin.html.vue"]]);export{g as default};
