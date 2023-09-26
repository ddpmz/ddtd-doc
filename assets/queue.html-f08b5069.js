import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,d as e}from"./app-531015dd.js";const t={},p=e(`<h2 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h2><p>一般用来缓解服务器压力，将一些耗时的任务丢到队列中进行处理，比如操作日志记录。</p><h2 id="支持的中间件" tabindex="-1"><a class="header-anchor" href="#支持的中间件" aria-hidden="true">#</a> 支持的中间件</h2><p>目前只支持以下中间件:</p><ul><li>disk</li><li>redis</li><li>rocketmq</li><li>kafka</li></ul><h2 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h2><p>以访问日志写入数据库为例</p><h4 id="定义消息类型" tabindex="-1"><a class="header-anchor" href="#定义消息类型" aria-hidden="true">#</a> 定义消息类型</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// internal\\consts\\queue.go</span>
<span class="token comment">// 消息队列</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
  <span class="token comment">// ...</span>
	QueueAccessLogTopic <span class="token operator">=</span> <span class="token string">\`access_log\`</span> <span class="token comment">// 访问日志</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="推送消息" tabindex="-1"><a class="header-anchor" href="#推送消息" aria-hidden="true">#</a> 推送消息</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;ddtd/internal/library/queue&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// AutoLog 根据配置自动记录请求日志</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>sSysAccessLog<span class="token punctuation">)</span> <span class="token function">AutoLog</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...定义数据 data</span>

	err <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span>consts<span class="token punctuation">.</span>QueueAccessLogTopic<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="消费消息" tabindex="-1"><a class="header-anchor" href="#消费消息" aria-hidden="true">#</a> 消费消息</h4><p>需要实现接口 <code>queue.Consumer</code>，并注册到消费者队列中</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Consumer 消费者接口，实现该接口即可加入到消费队列中</span>
<span class="token keyword">type</span> Consumer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">GetTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>                                    <span class="token comment">// 获取消费主题</span>
	<span class="token function">Handle</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> mqMsg MqMsg<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token comment">// 处理消息的方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// internal\\queues\\access_log.go</span>
<span class="token keyword">package</span> queues

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;encoding/json&quot;</span>

	<span class="token string">&quot;ddtd/internal/consts&quot;</span>
	<span class="token string">&quot;ddtd/internal/library/queue&quot;</span>
	<span class="token string">&quot;ddtd/internal/model/entity&quot;</span>
	<span class="token string">&quot;ddtd/internal/service&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 注册任务到消费者队列</span>
	queue<span class="token punctuation">.</span><span class="token function">RegisterConsumer</span><span class="token punctuation">(</span>SysAccessLog<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// SysAccessLog 系统日志</span>
<span class="token keyword">var</span> SysAccessLog <span class="token operator">=</span> <span class="token operator">&amp;</span>qSysAccessLog<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> qSysAccessLog <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// GetTopic 主题</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>qSysAccessLog<span class="token punctuation">)</span> <span class="token function">GetTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> consts<span class="token punctuation">.</span>QueueAccessLogTopic
<span class="token punctuation">}</span>

<span class="token comment">// Handle 处理消息</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>qSysAccessLog<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> mqMsg queue<span class="token punctuation">.</span>MqMsg<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> data entity<span class="token punctuation">.</span>SysAccessLog
	<span class="token keyword">if</span> err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>mqMsg<span class="token punctuation">.</span>Body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

  <span class="token comment">// 业务处理逻辑</span>
	<span class="token keyword">return</span> service<span class="token punctuation">.</span><span class="token function">SysAccessLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RealWrite</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>// manifest\\config\\config.yaml
<span class="token comment">#消息队列</span>
<span class="token key atrule">queue</span><span class="token punctuation">:</span>
  <span class="token key atrule">switch</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 队列开关，可选：true|false，默认为true</span>
  <span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">&quot;redis&quot;</span> <span class="token comment"># 队列驱动，可选：redis|rocketmq|kafka，默认为disk</span>
  <span class="token key atrule">retry</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># 重试次数，仅rocketmq|redis支持</span>
  <span class="token key atrule">groupName</span><span class="token punctuation">:</span> <span class="token string">&quot;ddtd&quot;</span> <span class="token comment"># mq群组名称</span>
  <span class="token comment">#磁盘队列</span>
  <span class="token key atrule">disk</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;./storage/diskqueue&quot;</span> <span class="token comment"># 数据存放路径</span>
    <span class="token key atrule">batchSize</span><span class="token punctuation">:</span> <span class="token number">100</span> <span class="token comment"># 每100条消息同步一次，batchSize和batchTime满足其一就会同步一次</span>
    <span class="token key atrule">batchTime</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 每1秒消息同步一次</span>
    <span class="token key atrule">segmentSize</span><span class="token punctuation">:</span> <span class="token number">10485760</span> <span class="token comment"># 每个topic分片数据文件最大字节，默认10M</span>
    <span class="token key atrule">segmentLimit</span><span class="token punctuation">:</span> <span class="token number">3000</span> <span class="token comment"># 每个topic最大分片数据文件数量，超出部分将会丢弃</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1:6379&quot;</span> <span class="token comment"># redis服务地址，默认为127.0.0.1:6379</span>
    <span class="token key atrule">db</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># 指定redis库</span>
    <span class="token key atrule">pass</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span> <span class="token comment"># redis密码</span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment"># 队列超时时间(s) ，0为永不超时，当队列一直没有被消费到达超时时间则队列会被销毁</span>
  <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1:9876&quot;</span> <span class="token comment"># brocker地址+端口</span>
    <span class="token key atrule">logLevel</span><span class="token punctuation">:</span> <span class="token string">&quot;all&quot;</span> <span class="token comment"># 系统日志级别，可选：all|close|debug|info|warn|error|fatal</span>
  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">address</span><span class="token punctuation">:</span> <span class="token string">&quot;127.0.0.1:9092&quot;</span> <span class="token comment"># kafka地址+端口</span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;2.0.0.0&quot;</span> <span class="token comment"># kafka专属配置，默认2.0.0.0</span>
    <span class="token key atrule">randClient</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 开启随机生成clientID，可以实现启动多实例同时一起消费相同topic，加速消费能力的特性，默认为true</span>
    <span class="token key atrule">multiConsumer</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否支持创建多个消费者</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2><p>目前是将错误的消息放到数据库 <code>sys_failed_job</code> 失败队列中，可以在后台管理 <code>系统管理</code> -&gt; <code>失败队列</code> 中查看，并处理。<br> 如果想直接将错误的消息重新加入到队列中，可以修改 <code>internal\\library\\queue\\consumer.go</code> 中的 <code>consumerListen</code> 方法，将数据库操作代码注释掉，将 <code>queue.Push</code> 的注释取消即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// consumerListen 消费者监听</span>
<span class="token keyword">func</span> <span class="token function">consumerListen</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> job Consumer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token comment">// 遇到错误，重新加入到队列</span>
    <span class="token comment">// queue.Push(topic, mqMsg.Body)</span>

    <span class="token comment">// 遇到错误，加入到失败队列，等待后台处理</span>
    err <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">SysFailedJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>sysin<span class="token punctuation">.</span>FailedJobAddInp<span class="token punctuation">{</span>
      Driver<span class="token punctuation">:</span>   config<span class="token punctuation">.</span>Driver<span class="token punctuation">,</span>
      Topic<span class="token punctuation">:</span>    topic<span class="token punctuation">,</span>
      Playload<span class="token punctuation">:</span> gjson<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>mqMsg<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">,</span>
      ErrMsg<span class="token punctuation">:</span>   gerror<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span>
      FailedAt<span class="token punctuation">:</span> gtime<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","queue.html.vue"]]);export{r as default};
