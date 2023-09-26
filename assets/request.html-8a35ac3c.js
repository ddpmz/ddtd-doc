import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,d as t}from"./app-531015dd.js";const e={},p=t(`<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h2><p>定义了一些常用的请求方法，例如 <code>Get</code>、<code>Post</code>、<code>Put</code>、<code>Delete</code> 等。<br> 封装的目的是为了统一请求的处理，例如请求失败时，自动提示错误信息。</p><p><code>api</code> 统一定义在 <code>src/api</code> 目录下，例如 <code>src/api/system/dict.ts</code>。</p><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2><h3 id="一般的-get-post" tabindex="-1"><a class="header-anchor" href="#一般的-get-post" aria-hidden="true">#</a> 一般的 Get Post</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src\\api\\org\\dept.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/utils/request&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Api <span class="token operator">=</span> <span class="token punctuation">{</span>
  DeptList<span class="token operator">:</span> <span class="token string">&quot;/dept/list&quot;</span><span class="token punctuation">,</span>
  DeptEdit<span class="token operator">:</span> <span class="token string">&quot;/dept/edit&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getDeptList</span><span class="token punctuation">(</span>params<span class="token operator">?</span><span class="token operator">:</span> Recordable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> Api<span class="token punctuation">.</span>DeptList<span class="token punctuation">,</span>
    params<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">editDept</span><span class="token punctuation">(</span>params<span class="token operator">:</span> Recordable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> Api<span class="token punctuation">.</span>DeptEdit<span class="token punctuation">,</span>
    params<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有上传文件的-post" tabindex="-1"><a class="header-anchor" href="#有上传文件的-post" aria-hidden="true">#</a> 有上传文件的 Post</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">importDictData</span><span class="token punctuation">(</span>file<span class="token operator">:</span> File<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> Api<span class="token punctuation">.</span>DictDataImport<span class="token punctuation">,</span>
    params<span class="token operator">:</span> <span class="token punctuation">{</span> file <span class="token punctuation">}</span><span class="token punctuation">,</span>
    headers<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;Content-Type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;multipart/form-data&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接收结果" tabindex="-1"><a class="header-anchor" href="#接收结果" aria-hidden="true">#</a> 接收结果</h3><p>因为后端返回的数据格式是统一的，所以可以直接接收 <code>data</code> 字段的数据。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;list&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timestamp&quot;</span><span class="token operator">:</span> <span class="token number">1695692870657</span><span class="token punctuation">,</span>
  <span class="token property">&quot;traceID&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7820be83ae4f881773fb4d62bc048379&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如下方示例中的 <code>res</code> 就是后端返回的 <code>data</code> 字段的数据。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 加载部门数据</span>
<span class="token keyword">const</span> <span class="token function-variable function">loadDeptData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getDeptList</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","request.html.vue"]]);export{d as default};