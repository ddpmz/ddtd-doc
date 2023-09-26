import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c as p,a as c,b as n,e as i,w as l,d as s}from"./app-531015dd.js";const u={},d=s('<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h2><p>一些数据库 <code>dao</code> 扩展使用方法，偷懒专用。</p><h2 id="handler" tabindex="-1"><a class="header-anchor" href="#handler" aria-hidden="true">#</a> Handler</h2><h3 id="数据范围过滤" tabindex="-1"><a class="header-anchor" href="#数据范围过滤" aria-hidden="true">#</a> 数据范围过滤</h3><ul><li>FilterAuth</li><li>FilterAuthWithField</li></ul><p>通过 <code>ctx</code> 中的用户角色 <code>data_scope</code> 数据范围的设置，自动过滤掉不在数据范围内的数据。<br> 例如：用户角色为 <code>manager</code>，数据范围为当前部门，则会自动过滤掉不属于当前部门的数据。</p>',6),r=s(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">.</span>FilterAuth<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>list<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  err <span class="token operator">=</span> gerror<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> consts<span class="token punctuation">.</span>ErrorSQL<span class="token punctuation">)</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自动识别业务数据表中的用户 id 字段，优先级：<code>created_by</code> &gt; <code>user_id</code>，如果不是这两个字段，请调用 <code>FilterAuthWithField</code> 方法。</p><p>例如当用户 id 为 <code>id</code> 时：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>count<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> dao<span class="token punctuation">.</span>AdminUser<span class="token punctuation">.</span><span class="token function">Ctx</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">.</span><span class="token function">FilterAuthWithField</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询关键字" tabindex="-1"><a class="header-anchor" href="#查询关键字" aria-hidden="true">#</a> 查询关键字</h3><p>因为经常要根据关键字查询多个字段，用 <code>or</code> 拼接会比较麻烦，封装了一个 <code>FilterKeyword</code> 方法，可以直接传入关键字和需要查询的字段，自动拼接 <code>or</code> 条件。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>m <span class="token operator">:=</span> dao<span class="token punctuation">.</span>AdminDept<span class="token punctuation">.</span><span class="token function">Ctx</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

<span class="token keyword">if</span> in<span class="token punctuation">.</span>Keyword <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
  m <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">.</span><span class="token function">FilterKeyword</span><span class="token punctuation">(</span>in<span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pinyin_search&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等效于</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>m <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;\`name\` like ? or \`pinyin_search\` like ? or \`key\` like ?&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;%&quot;</span><span class="token operator">+</span>in<span class="token punctuation">.</span>Keyword<span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;%&quot;</span><span class="token operator">+</span>in<span class="token punctuation">.</span>Keyword<span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;%&quot;</span><span class="token operator">+</span>in<span class="token punctuation">.</span>Keyword<span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hook" tabindex="-1"><a class="header-anchor" href="#hook" aria-hidden="true">#</a> Hook</h2><h3 id="userinfo" tabindex="-1"><a class="header-anchor" href="#userinfo" aria-hidden="true">#</a> UserInfo</h3><ul><li>可以自动屏蔽掉隐私信息，<code>password_hash</code>、<code>salt</code></li><li>可以填充 <code>deptName</code>、<code>deptTree</code>、<code>roleName</code></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">Hook</span><span class="token punctuation">(</span>hook<span class="token punctuation">.</span>UserInfo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">.</span><span class="token function">PageAndOrder</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>list<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>gf v2.5 hook 不支持链式调用，只会最后一个 hook 生效。</p></div><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><h3 id="唯一校验" tabindex="-1"><a class="header-anchor" href="#唯一校验" aria-hidden="true">#</a> 唯一校验</h3><p>例如验证菜单标题是否已经存在</p><ul><li>IsUnique</li><li>IsUniqueError <ul><li>多用于 <code>service</code> 层校验，返回错误信息</li></ul></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">IsUnique</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> dao daoInstance<span class="token punctuation">,</span> where g<span class="token punctuation">.</span>Map<span class="token punctuation">,</span> pkId <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>isUnique <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>dao <ul><li>dao 实例，例如 <code>dao.SysRegion</code></li></ul></li><li>where <ul><li>查询条件，例如 <code>g.Map{&quot;name&quot;: &quot;中国&quot;}</code></li></ul></li><li>pkId <ul><li>主键 id，例如 <code>1</code>，如果是更新操作，需要排除当前记录，例如 <code>1</code>，则会排除 <code>id</code> 为 <code>1</code> 的记录，如果是新增操作，不需要传入</li></ul></li></ul><p>例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>isUnique<span class="token punctuation">,</span> err <span class="token operator">=</span> ddorm<span class="token punctuation">.</span><span class="token function">IsUnique</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> dao<span class="token punctuation">.</span>SysUser<span class="token punctuation">,</span> g<span class="token punctuation">.</span>Map<span class="token punctuation">{</span><span class="token string">&quot;phone&quot;</span><span class="token punctuation">:</span> in<span class="token punctuation">.</span>Phone<span class="token punctuation">}</span><span class="token punctuation">,</span> gconv<span class="token punctuation">.</span><span class="token function">Int64</span><span class="token punctuation">(</span>in<span class="token punctuation">.</span>OldId<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想要返回错误信息，可以使用 <code>IsUniqueError</code> 方法，会返回 <code>error</code> 信息。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">=</span> ddorm<span class="token punctuation">.</span><span class="token function">IsUniqueError</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> dao<span class="token punctuation">.</span>AdminMenu<span class="token punctuation">,</span> g<span class="token punctuation">.</span>Map<span class="token punctuation">{</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> in<span class="token punctuation">.</span>Title<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;菜单标题已存在&quot;</span><span class="token punctuation">,</span> in<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="树形结构维护" tabindex="-1"><a class="header-anchor" href="#树形结构维护" aria-hidden="true">#</a> 树形结构维护</h3><p>有许多表都是要维护树形结构，例如 <code>sys_dept</code>、<code>sys_menu</code> 等，封装了一些方法，可以方便的维护树形结构。</p><p>要实现树形结构，数据库表中需要有三个字段，名称不可自定义：</p><ul><li><code>pid</code><ul><li>上级 id</li></ul></li><li><code>tree</code><ul><li>关系树结构，如 <code>tr_1 tr_2 </code></li></ul></li><li><code>level</code><ul><li>层级，如 1、2、3</li></ul></li></ul><h4 id="生成关系树标识-genlabel" tabindex="-1"><a class="header-anchor" href="#生成关系树标识-genlabel" aria-hidden="true">#</a> 生成关系树标识 <code>GenLabel</code></h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">GenLabel</span><span class="token punctuation">(</span>basic <span class="token builtin">string</span><span class="token punctuation">,</span> appendId <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>basic <ul><li>基础标识，如 <code>tr_1 tr_2 </code></li></ul></li><li>appendId <ul><li>追加 id，如 <code>5</code>，则会生成 <code>tr_1 tr_2 tr_5</code></li></ul></li></ul><h4 id="获取指定-id-的树标签-getidlabel" tabindex="-1"><a class="header-anchor" href="#获取指定-id-的树标签-getidlabel" aria-hidden="true">#</a> 获取指定 Id 的树标签 <code>GetIdLabel</code></h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">GetIdLabel</span><span class="token punctuation">(</span>id <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>id <ul><li>要获取的 id，如 <code>5</code>，则会返回 <code>tr_5</code></li></ul></li></ul><p>示例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;ddtd/utility/tree&quot;</span>
<span class="token punctuation">)</span>
<span class="token comment">// 查询当前部门及下级部门</span>
m<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;(id = ? or tree like ?)&quot;</span><span class="token punctuation">,</span> deptId<span class="token punctuation">,</span> <span class="token string">&quot;%&quot;</span><span class="token operator">+</span>tree<span class="token punctuation">.</span><span class="token function">GetIdLabel</span><span class="token punctuation">(</span>deptId<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="生成关系树-并更新下级关系树及层级" tabindex="-1"><a class="header-anchor" href="#生成关系树-并更新下级关系树及层级" aria-hidden="true">#</a> 生成关系树，并更新下级关系树及层级</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">GenAndUpdateSubTree</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> dao daoInstance<span class="token punctuation">,</span> id<span class="token punctuation">,</span> pid <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>newLevel <span class="token builtin">int</span><span class="token punctuation">,</span> newTree <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>dao <ul><li>dao 实例，例如 <code>dao.AdminDept</code></li></ul></li><li>id <ul><li>当前数据 <code>id</code>，例如 <code>5</code>，如果是新增，传入 <code>0</code></li></ul></li><li>pid <ul><li>当前数据 <code>pid</code>，例如 <code>1</code></li></ul></li><li>newLevel <ul><li>新的层级，例如 <code>2</code></li></ul></li><li>newTree <ul><li>新的关系树，例如 <code>tr_1 tr_2 tr_5</code></li></ul></li></ul><p>例如：<br> 组织架构新增时，需要获取当前的层级和关系树，<br> 如果是修改，当 <code>pid</code> 发生变更时，还要更新下级部门的层级和关系树。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;ddtd/internal/library/ddorm&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// Edit 新增、修改</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>sAdminDept<span class="token punctuation">)</span> <span class="token function">Edit</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> in <span class="token operator">*</span>adminin<span class="token punctuation">.</span>DeptEditInp<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  data <span class="token operator">:=</span> do<span class="token punctuation">.</span>AdminDept<span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
  data<span class="token punctuation">.</span>Level<span class="token punctuation">,</span> data<span class="token punctuation">.</span>Tree<span class="token punctuation">,</span> err <span class="token operator">=</span> ddorm<span class="token punctuation">.</span><span class="token function">GenAndUpdateSubTree</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> dao<span class="token punctuation">.</span>AdminDept<span class="token punctuation">,</span> in<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> in<span class="token punctuation">.</span>Pid<span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> in<span class="token punctuation">.</span>Id <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> dao<span class="token punctuation">.</span>AdminDept<span class="token punctuation">.</span><span class="token function">Ctx</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> dao<span class="token punctuation">.</span>AdminDept<span class="token punctuation">.</span><span class="token function">Ctx</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Data</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> in<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41);function k(v,m){const a=e("RouterLink");return o(),p("div",null,[d,c("p",null,[n("详见"),i(a,{to:"/backend/start/permission.html#%E6%95%B0%E6%8D%AE%E8%8C%83%E5%9B%B4"},{default:l(()=>[n("数据范围")]),_:1})]),r])}const h=t(u,[["render",k],["__file","orm.html.vue"]]);export{h as default};
