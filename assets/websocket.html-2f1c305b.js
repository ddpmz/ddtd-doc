import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as p,a as n,b as s,e as c,w as l,d as a}from"./app-531015dd.js";const u={},d=a(`<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h2><p>websocket 发送消息，有两种方式:</p><ul><li><a href="#%E6%B6%88%E6%81%AF%E4%B8%BB%E5%8A%A8%E5%8F%91%E9%80%81">消息主动发送</a> 主动发送消息给在线用户，主要用于通知、强制下线等</li><li><a href="#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E5%99%A8%E6%B3%A8%E5%86%8C">事件监听器注册</a> 接收前端事件后，自动推送消息给前端，业务上用这个比较多，比如大屏监控</li></ul><h3 id="消息主动发送" tabindex="-1"><a class="header-anchor" href="#消息主动发送" aria-hidden="true">#</a> 消息主动发送</h3><p>用于主动推送消息给前端，不需要前端主动发消息。</p><p><code>SendToUser(userId int64, resp *WsResponse)</code></p><ul><li>userId: 用户 ID</li><li>resp: 响应参数，参考 <a href="#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F">WsResponse</a></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;ddtd/internal/websocket&quot;</span>

<span class="token comment">// 向单个用户发送消息</span>
websocket<span class="token punctuation">.</span><span class="token function">Manager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SendToUser</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> res<span class="token punctuation">)</span>

<span class="token comment">// 向多个用户发送消息</span>
websocket<span class="token punctuation">.</span><span class="token function">Manager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SendToUsers</span><span class="token punctuation">(</span>userIds<span class="token punctuation">,</span> res<span class="token punctuation">)</span>

<span class="token comment">// 向所有用户发送消息</span>
websocket<span class="token punctuation">.</span><span class="token function">Manager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SendToAll</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件监听器注册" tabindex="-1"><a class="header-anchor" href="#事件监听器注册" aria-hidden="true">#</a> 事件监听器注册</h3><p>主要用于被动推送消息给前端，需要前端主动发消息，后端触发后，推送消息给前端。</p><h4 id="_1-定义好消息处理函数" tabindex="-1"><a class="header-anchor" href="#_1-定义好消息处理函数" aria-hidden="true">#</a> 1. 定义好消息处理函数</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>cMonitor<span class="token punctuation">)</span> <span class="token function">Trends</span><span class="token punctuation">(</span>client <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> req <span class="token operator">*</span>websocket<span class="token punctuation">.</span>WsRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token comment">// 定义数据</span>
  data <span class="token operator">:=</span> g<span class="token punctuation">.</span>Map<span class="token punctuation">{</span>
		<span class="token string">&quot;head&quot;</span><span class="token punctuation">:</span> monitorHeads<span class="token punctuation">,</span>
		<span class="token comment">// ...其他数据</span>
	<span class="token punctuation">}</span>

	websocket<span class="token punctuation">.</span><span class="token function">SendSuccess</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> req<span class="token punctuation">.</span>Event<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>client: 客户端连接信息，参考 <a href="#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F">Client</a></li><li>req: 请求参数，参考 <a href="#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F">WsRequest</a></li></ul><h4 id="_2-将消息处理函数注册到路由" tabindex="-1"><a class="header-anchor" href="#_2-将消息处理函数注册到路由" aria-hidden="true">#</a> 2. 将消息处理函数注册到路由</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// internal\\router\\websocket.go</span>
<span class="token keyword">func</span> <span class="token function">WebSocket</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> group <span class="token operator">*</span>ghttp<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

	<span class="token comment">// 注册消息路由</span>
	websocket<span class="token punctuation">.</span><span class="token function">RegisterMsg</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>websocket<span class="token punctuation">.</span>EventHandler<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
		<span class="token string">&quot;admin/monitor/trends&quot;</span><span class="token punctuation">:</span>  admin<span class="token punctuation">.</span>Monitor<span class="token punctuation">.</span>Trends<span class="token punctuation">,</span>  <span class="token comment">// 注册后台监控，动态数据</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),r={class:"hint-container warning"},k=n("p",{class:"hint-container-title"},"注意",-1),m=n("br",null,null,-1),v=n("code",null,"admin/monitor/trends",-1),b=n("code",null,"admin/monitor/trends",-1),h=n("br",null,null,-1),g=n("code",null,"模块名/控制器名/事件名",-1),E=n("br",null,null,-1),f=a(`<h3 id="数据格式" tabindex="-1"><a class="header-anchor" href="#数据格式" aria-hidden="true">#</a> 数据格式</h3><h4 id="wsrequest" tabindex="-1"><a class="header-anchor" href="#wsrequest" aria-hidden="true">#</a> WsRequest</h4><p>前端请求消息</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// WsRequest 请求参数</span>
<span class="token keyword">type</span> WsRequest <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Event <span class="token builtin">string</span> <span class="token string">\`json:&quot;event&quot;\`</span> <span class="token comment">// 事件</span>
	Data  g<span class="token punctuation">.</span>Map  <span class="token string">\`json:&quot;data&quot;\`</span>  <span class="token comment">// 数据</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="wsresponse" tabindex="-1"><a class="header-anchor" href="#wsresponse" aria-hidden="true">#</a> WsResponse</h4><p>响应消息</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// WsResponse 响应参数</span>
<span class="token keyword">type</span> WsResponse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Event     <span class="token builtin">string</span>      <span class="token string">\`json:&quot;event&quot;\`</span>              <span class="token comment">// 事件</span>
	Code      <span class="token builtin">int</span>         <span class="token string">\`json:&quot;code&quot;\`</span>               <span class="token comment">// 状态码</span>
	Data      <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">\`json:&quot;data,omitempty&quot;\`</span>     <span class="token comment">// 数据</span>
	ErrorMsg  <span class="token builtin">string</span>      <span class="token string">\`json:&quot;errorMsg,omitempty&quot;\`</span> <span class="token comment">// 错误信息</span>
	Timestamp <span class="token builtin">int64</span>       <span class="token string">\`json:&quot;timestamp&quot;\`</span>          <span class="token comment">// 服务器时间戳</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h4><p>保存客户端连接信息</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Client 客户端连接信息</span>
<span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Addr          <span class="token builtin">string</span>           <span class="token comment">// 客户端地址</span>
	Id            <span class="token builtin">string</span>           <span class="token comment">// 连接唯一标识</span>
	Socket        <span class="token operator">*</span>ghttp<span class="token punctuation">.</span>WebSocket <span class="token comment">// 客户端连接</span>
	FirstBeatTime <span class="token builtin">int64</span>            <span class="token comment">// 第一次心跳时间</span>
	LastBeatTime  <span class="token builtin">int64</span>            <span class="token comment">// 最后一次心跳时间</span>
	CtxUser       <span class="token operator">*</span>model<span class="token punctuation">.</span>Identity  <span class="token comment">// 用户信息</span>
	Ip            <span class="token builtin">string</span>           <span class="token comment">// 客户端ip</span>
	UserAgent     <span class="token builtin">string</span>           <span class="token comment">// 客户端userAgent</span>
	ctx       		context<span class="token punctuation">.</span>Context  <span class="token comment">// 上下文</span>
	SendClose     <span class="token builtin">bool</span>             <span class="token comment">// 是否关闭</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="eventhandler" tabindex="-1"><a class="header-anchor" href="#eventhandler" aria-hidden="true">#</a> EventHandler</h4><p>消息注册</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 消息处理器</span>
<span class="token keyword">type</span> EventHandler <span class="token keyword">func</span><span class="token punctuation">(</span>client <span class="token operator">*</span>Client<span class="token punctuation">,</span> req <span class="token operator">*</span>WsRequest<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function _(B,w){const e=o("RouterLink");return i(),p("div",null,[d,n("div",r,[k,n("p",null,[s("路由注册时，事件名必须和前端发送的事件名一致，否则无法触发"),m,s(" 比如: 这里注册的是 "),v,s("，前端发送的也必须是 "),b,h,s(" 格式: "),g,E,c(e,{to:"/frontend/component/websocket.html#%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B"},{default:l(()=>[s("前端定义事件类型")]),_:1})])]),f])}const C=t(u,[["render",_],["__file","websocket.html.vue"]]);export{C as default};