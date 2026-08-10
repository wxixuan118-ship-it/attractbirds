# AttractBirds.app 网站架构与实施方案

版本：1.0  
日期：2026-08-10  
项目域名：`https://attractbirds.app`

## 1. 项目概述

### 1.1 产品定位

AttractBirds.app 是一个面向北美家庭园艺与观鸟用户的鸟类友好庭院知识平台。网站通过鸟种、地区、食物、植物、喂食器、季节和常见问题等实体建立可检索的知识图谱，并以 AI Backyard Planner 为核心工具，为用户生成本地化、可执行的引鸟方案。

核心价值主张：

> Discover which birds live near you—and exactly what to plant, feed, and change to attract them.

### 1.2 目标用户

- 希望吸引特定鸟类的住宅用户
- 刚开始使用喂鸟器的新手
- 希望建设鸟类友好花园的园艺用户
- 搜索本地常见鸟种和季节信息的观鸟用户
- 遇到“鸟不来”“食物没人吃”等问题的用户

### 1.3 商业目标

1. 通过高意图自然搜索建立稳定流量。
2. 用免费知识页将用户导入 Backyard Planner。
3. 通过喂食器、鸟食、植物和庭院用品的联盟营销变现。
4. 后期提供高级个性化方案、保存计划和季节提醒等订阅功能。

### 1.4 首期范围

首期聚焦美国 backyard birds，不在早期覆盖全球 10,000 多个鸟种。优先建设：

- 美国常见庭院鸟种
- 美国州级地区页
- 高需求的鸟类食物和植物主题
- 常见喂鸟器及故障诊断页
- 可产生个性化方案的 Backyard Planner

## 2. 成功指标

### 2.1 北极星指标

每月生成并被用户阅读或保存的有效庭院方案数量。

### 2.2 关键指标

- 自然搜索有效点击量
- 被索引且获得曝光的内容页比例
- Planner 开始率与完成率
- 内容页到 Planner 的转化率
- 联盟商品点击率与每访问收入
- 返回用户比例
- 页面数据完整率和内容质量通过率

### 2.3 首年建议目标

采用阶段目标而不是一次发布 8,000–10,000 页：

| 阶段 | 可索引优质页面 | 主要目标 |
|---|---:|---|
| MVP | 150–250 | 验证模板、数据和收录质量 |
| Phase 2 | 500–1,000 | 建立鸟种与州级主题权威性 |
| Phase 3 | 2,000–4,000 | 扩展组合页和商业页面 |
| 成熟期 | 5,000–10,000 | 在需求与数据支持下持续扩展 |

## 3. 信息架构

### 3.1 顶级导航

```text
AttractBirds.app
├── Home
├── Birds
│   ├── Bird Species
│   ├── Birds by State
│   └── Seasonal Birds
├── Bird Food
├── Bird-Friendly Plants
├── Bird Feeders
├── Bird Problems
├── Backyard Planner
└── Tools
```

建议主导航保持 6–7 个入口，将 Seasonal Birds 放入 Birds 下拉菜单，避免导航过度拥挤。

### 3.2 核心实体

Bird 是中心实体，其他实体与其建立多对多关系：

```text
Location ─── Bird ─── Food
               │
          ┌────┼────┐
          │    │    │
        Plant Feeder Season
          │    │
          └─ Problem / Solution
```

每条关系必须包含来源、置信度和适用条件。例如“某植物吸引某鸟”应区分花蜜、果实、种子、昆虫栖息地或筑巢遮蔽等原因。

## 4. URL 与页面类型

### 4.1 URL 原则

- 全部使用小写英文和连字符。
- 使用稳定的规范化 slug，不在 URL 中放年份。
- 鸟种使用标准英文通名，如 `northern-cardinal`，不使用含义过宽的 `cardinal`。
- 每个搜索意图只对应一个规范页，避免重复组合页竞争。
- 筛选、排序和用户参数默认不可索引，并指向主页面 canonical。

### 4.2 页面清单

| 模块 | URL 示例 | 搜索意图 | 成熟期规模 |
|---|---|---|---:|
| 鸟种百科 | `/birds/northern-cardinal` | Northern Cardinal / how to attract | 500–2,000 |
| 州级鸟类 | `/birds/california` | backyard birds in California | 50 |
| 城市鸟类 | `/birds/california/los-angeles` | birds in Los Angeles backyard | 300–3,000，按需发布 |
| 鸟类食物 | `/bird-food/northern-cardinal` | what do cardinals eat | 300–500 |
| 食物主题 | `/bird-food/sunflower-seeds` | birds that eat sunflower seeds | 50–200 |
| 植物百科 | `/plants/american-elderberry` | American elderberry for birds | 500–1,000 |
| 鸟 × 植物 | `/plants/attract-hummingbirds` | plants that attract hummingbirds | 100–500 |
| 喂食器类型 | `/feeders/platform-feeder` | platform feeder / birds attracted | 50–200 |
| 鸟 × 喂食器 | `/feeders/best-for-northern-cardinals` | best feeder for cardinals | 100–500 |
| 问题诊断 | `/bird-problems/no-birds-at-feeder` | why birds stopped coming | 50–500 |
| 季节页 | `/seasonal-birds/california/spring` | spring birds in California | 200 起，按数据发布 |
| Planner | `/planner` | personalized bird yard plan | 1 个动态工具 |

“500 birds × 5 food types = 2,500 页”不应直接作为发布规则。只有搜索意图独立、数据充分且内容差异明显的组合才生成可索引页面；其余关系在鸟种页或食物页中展示。

## 5. 页面模板

### 5.1 鸟种百科页

示例：`/birds/northern-cardinal`

1. 面包屑与鸟种名称
2. 识别摘要：科学名、体型、颜色、栖息地、分布
3. 图片与雌雄/幼鸟识别提示
4. Where it is found：州、区域、全年或迁徙状态
5. Natural diet
6. How to attract this bird
7. 推荐食物
8. 推荐植物
9. 推荐喂食器及摆放方法
10. 水源、遮蔽和筑巢条件
11. 季节变化
12. 常见问题
13. 数据来源与更新时间
14. “Build a yard plan for this bird” CTA

页面不能只是字段拼接。开头摘要、吸引建议、季节差异和 FAQ 应由结构化事实驱动，并经过编辑规则检查。

### 5.2 地区页

示例：`/birds/california`

- 当地鸟类生态简介
- 最常见的庭院鸟种
- 全年居民与季节访客
- 按栖息环境分类
- 适合本州的原生植物
- 推荐食物和喂食器
- 本州季节性行动清单
- 入侵物种、疾病或法规提示（如适用）
- 进入城市页和相邻州页面的链接
- 个性化 Planner CTA

城市页面只有在具备足够本地观测、植物适生性和独特内容时才开放索引。数据不足的城市由州页中的动态选择器承载，不创建薄内容页。

### 5.3 鸟类食物页

示例：`/bird-food/northern-cardinal`

- Natural diet
- Best feeder foods
- 按季节的食物变化
- 哪种喂食器适合该食物
- 食物投放和保存方法
- 不应提供的食物
- 会共同到访的其他鸟种
- 清洁和疾病防护提示

### 5.4 植物页

示例：`/plants/american-elderberry`

- 学名与植物类型
- 原生区域及 USDA Zone
- 光照、水分、土壤和成熟尺寸
- 花期、结果期和观赏季节
- 吸引的鸟种及原因
- 提供的生态价值：花蜜、果实、种子、昆虫、遮蔽、筑巢
- 种植与维护建议
- 毒性、侵略性或宠物安全提示
- 相似植物及替代选择

### 5.5 鸟 × 植物主题页

示例：`/plants/attract-hummingbirds`

- 选择标准和地域差异
- 推荐植物列表
- 按光照、花期、区域和植株高度筛选
- 连续开花组合建议
- 原生植物优先说明
- 庭院布局建议
- 相关鸟种和 Planner CTA

### 5.6 喂食器页

示例：`/feeders/platform-feeder`

- 适合的鸟种
- 推荐食物
- 理想摆放位置和高度
- 清洁频率
- 防松鼠、防撞窗和捕食者安全
- 优点、缺点及适用庭院
- 产品选择标准
- 经编辑审核的联盟商品区

商业内容必须明确披露联盟关系，排名基于公开选择标准，不以佣金高低决定。

### 5.7 问题诊断页

示例：`/bird-problems/no-birds-at-feeder`

- 症状快速判断
- 按概率和可验证性排列的原因
- 用户可执行的检查步骤
- 修复方法和预计见效时间
- 何时应清空、消毒或暂停喂食
- 与疾病、捕食者及窗户安全相关的警示
- 相关诊断页和 Planner 入口

### 5.8 Backyard Planner

输入：

- ZIP code 或城市/州
- 庭院面积
- 日照情况
- 庭院类型：阳台、露台、小院、大院
- 目标鸟类或“吸引更多本地鸟类”
- 是否可种植、是否允许喂食器
- 预算、宠物、鹿害等限制

输出：

- 本地预期鸟种
- 分优先级的植物组合
- 推荐食物和喂食器
- 水源和遮蔽方案
- 简化布局图或分区建议
- 季节行动清单
- 安全、清洁及本地适用性提示
- 每条推荐背后的理由和数据来源

第一版使用规则引擎生成结果，AI 负责解释和组织语言，不允许模型凭空创造物种分布、植物原生性或安全事实。

## 6. 数据架构

### 6.1 主要数据表

#### `birds`

- `id`
- `slug`
- `common_name`
- `scientific_name`
- `taxonomy_order`
- `taxonomy_family`
- `size_min_cm` / `size_max_cm`
- `colors`
- `habitats`
- `resident_status`
- `conservation_status`
- `summary`
- `source_updated_at`
- `content_status`

#### `locations`

- `id`
- `slug`
- `type`：country/state/county/city/region
- `name`
- `parent_id`
- `latitude` / `longitude`
- `ecoregion`
- `usda_zones`
- `climate_attributes`

#### `bird_occurrences`

- `bird_id`
- `location_id`
- `season`
- `frequency_score`
- `presence_type`：resident/breeding/winter/migrant
- `observation_period`
- `source_id`
- `confidence`

#### `foods`

- `id`
- `slug`
- `name`
- `food_type`
- `description`
- `storage_guidance`
- `safety_notes`

#### `bird_foods`

- `bird_id`
- `food_id`
- `context`：natural/feeder
- `season`
- `preference_score`
- `evidence_level`
- `source_id`

#### `plants`

- `id`
- `slug`
- `common_name`
- `scientific_name`
- `plant_type`
- `native_regions`
- `usda_zone_min` / `usda_zone_max`
- `sun_requirements`
- `water_requirements`
- `height_min` / `height_max`
- `bloom_seasons`
- `fruit_seasons`
- `toxicity_notes`
- `invasive_regions`

#### `bird_plants`

- `bird_id`
- `plant_id`
- `benefit_type`：nectar/fruit/seed/insects/shelter/nesting
- `season`
- `strength_score`
- `source_id`

#### `feeders` 与 `bird_feeders`

- 类型、容量、食物兼容性、摆放方式、清洁要求
- 对应鸟种、适配评分、证据和注意事项

#### `problems` 与 `problem_causes`

- 问题 slug、症状、原因、诊断步骤、解决方案、严重程度、安全提示

#### `sources`

- 来源机构
- 原始 URL 或数据集标识
- 许可条件
- 抓取/导入时间
- 版本
- 可用于哪些字段

### 6.2 内容治理字段

所有可发布实体应包含：

- `status`：draft/reviewed/published/retired
- `reviewed_by`
- `reviewed_at`
- `last_verified_at`
- `quality_score`
- `source_count`
- `indexable`
- `canonical_target`

## 7. 数据来源与合规

候选来源包括 Cornell Lab of Ornithology、eBird、Audubon、政府开放数据、植物数据库及地方原生植物机构，但在使用前必须逐项确认：

- API 或数据集许可是否允许商业使用
- 是否允许缓存、再发布、衍生内容和图片展示
- 署名方式和链接要求
- 调用频率及数据保留限制
- 图片版权和人物/机构商标限制

不要直接复制来源网站描述。结构化事实应保留出处，最终文本采用原创编辑与事实组合。图片优先使用已授权媒体、开放许可资源或自有素材。

## 8. Programmatic SEO 策略

### 8.1 发布门槛

一个页面只有同时满足以下条件才可索引：

1. 存在明确、独立的搜索意图。
2. 关键字段完整度达到设定阈值。
3. 至少有可信数据来源支持核心事实。
4. 与同类页面有实质差异，而非仅替换名称。
5. 提供可执行建议、筛选、比较或本地信息等独特价值。
6. 已通过重复内容、事实冲突和语言质量检查。

未达标页面保持草稿、`noindex`，或合并到更强的主题页。

### 8.2 标题与元数据

模板仅作为基础，最终根据意图变化：

- 鸟种：`Northern Cardinal: Identification, Diet & How to Attract Them`
- 地区：`Backyard Birds in California: Common Species & Attraction Tips`
- 食物：`What Do Northern Cardinals Eat? Best Natural and Feeder Foods`
- 植物：`Best Plants for Hummingbirds: Native Flowers by Region`
- 问题：`Why Aren't Birds Coming to My Feeder? 10 Causes and Fixes`

避免在标题中机械加入 “AI”，除非页面实际提供 AI 功能。

### 8.3 Schema.org

按页面实际内容使用：

- `BreadcrumbList`
- `Article` 或 `WebPage`
- `FAQPage`，仅在 FAQ 对用户可见且内容真实存在时
- `ItemList`，用于明确的鸟种或植物列表
- `Product`，仅用于真实产品详情，不用于泛型喂食器页
- `SoftwareApplication`，用于 Planner 工具页

结构化数据不能把不属于网站的评分、虚构作者或自动生成内容标记为人工审核。

### 8.4 索引控制

- XML sitemap 按页面类型拆分。
- sitemap 只包含 canonical、200 状态且允许索引的页面。
- 参数筛选页默认 `noindex,follow`。
- 无数据组合返回有帮助的上级页建议；确实不存在的页面返回 404。
- 已淘汰实体在有明确替代页时 301，否则返回 410。
- 内容更新后刷新 `lastmod`，不为未变化页面伪造更新时间。

## 9. 内链与知识图谱

### 9.1 鸟种页链接规则

每个鸟种页优先链接到：

- 3–8 个最相关食物
- 3–8 个适合的植物
- 1–3 种喂食器
- 最常出现的州或地区
- 相关季节页
- 针对该鸟种预设目标的 Planner

### 9.2 反向链接规则

- 植物页链接到实际受益的鸟种。
- 地区页链接到当地高频鸟种。
- 食物和喂食器页链接到适配鸟种。
- 问题页链接到解决问题所需的食物、喂食器或安全指南。

### 9.3 Hub 页面

建立可人工编辑的主题 Hub：

- Hummingbirds
- Cardinals
- Songbirds
- Native Plants for Birds
- Winter Bird Feeding
- Small Backyard Birding

Hub 负责解释主题并组织子页面，不能只是链接列表。

## 10. 技术架构建议

### 10.1 推荐技术栈

- 前端：Next.js + TypeScript
- 样式：Tailwind CSS 或组件化 CSS
- 数据库：本地 PostgreSQL（开发阶段不依赖云数据库）
- ORM：Prisma，负责 Schema、类型生成和数据库迁移
- 内容后台：轻量自建后台或 Headless CMS
- 搜索：PostgreSQL 全文搜索起步，规模扩大后接专用搜索服务
- 图片：对象存储 + 图片 CDN
- Analytics：隐私友好的产品分析与 Search Console 数据
- 部署：支持 SSR、静态生成、增量更新和定时任务的平台

技术选型在实施时可替换，核心要求是支持结构化数据、增量静态生成、缓存和按实体重建页面。

### 10.2 本地 PostgreSQL 方案

开发数据库在本机运行，建议使用 PostgreSQL 17 或项目实施时仍受支持的稳定版本。可通过 macOS 原生包管理器安装，也可使用 Docker Compose；项目统一通过标准 PostgreSQL 连接串访问，不与具体安装方式绑定。

建议的本地配置：

```text
Host: 127.0.0.1
Port: 5432
Database: attractbirds
Application user: attractbirds_app
Schema: public
Timezone: UTC
Encoding: UTF-8
```

本地环境变量保存在不提交 Git 的 `.env.local` 中：

```text
DATABASE_URL=postgresql://attractbirds_app:<local-password>@127.0.0.1:5432/attractbirds?schema=public
```

实施规则：

- 不在代码、迁移文件或仓库文档中保存真实密码。
- 使用 Prisma migration 管理所有表结构变化，不手工修改共享数据库结构。
- `prisma/seed.ts` 只写入可重复执行的开发种子数据。
- 数据导入任务与网站运行账户分离；导入账户可获得所需写权限，网站账户遵循最小权限原则。
- 时间统一以 UTC 存储，页面按用户地区显示。
- slug、学名、来源标识和实体关系建立唯一约束，避免重复导入。
- 对 `bird_occurrences`、`bird_foods`、`bird_plants` 等关系表建立组合索引。
- 本地搜索优先使用 PostgreSQL 全文搜索、`pg_trgm` 和规范化字段，不在 MVP 引入额外搜索服务。

本地备份建议：

- 开发期间在大批量导入或迁移前执行一次 `pg_dump`。
- 备份文件写入项目外的受控备份目录，不提交 Git。
- 定期验证备份可通过 `pg_restore` 恢复到一个临时数据库。
- Schema migration 与种子数据进入版本控制，原始授权数据按许可要求单独保存。

本地 PostgreSQL 适用于开发、内容构建和单机内部运行。公开网站上线后，数据库不能继续只存在开发者电脑上；应在服务器上运行独立 PostgreSQL，或迁移到兼容的托管 PostgreSQL。应用仍使用同一 Schema 和迁移，不需要更换数据层代码。

### 10.3 渲染策略

- 首页、Hub、核心鸟种和高流量地区页：静态生成并按数据变化重建。
- 长尾实体页：增量静态生成。
- Planner：服务端计算或 API 路由，结果页默认不索引。
- 筛选器：客户端交互，服务端提供可抓取的核心默认内容。

### 10.4 内容生成流水线

```text
Source Import
  → Normalize Names and Taxonomy
  → Validate Licenses and Provenance
  → Resolve Entity Relationships
  → Calculate Completeness/Confidence
  → Generate Structured Draft
  → Fact and Duplicate Checks
  → Editorial Review
  → Publish / noindex / reject
  → Monitor Search and User Signals
```

AI 生成内容必须以数据库事实为上下文。生成后执行：

- 数字和地名一致性检查
- 学名与通名校验
- 地区/季节关系校验
- 植物原生性和入侵性校验
- 禁忌食物与安全信息校验
- 相似页面文本重复率检测

## 11. 设计与用户体验

### 11.1 视觉方向

- 自然、可信、清爽，不做过度“科技感”的 AI 网站。
- 以鸟类照片、植物插图和清晰信息卡片为主。
- 使用高对比度文字和适合户外用户阅读的大字号。
- 颜色可采用森林绿、温暖米色、天空蓝和少量莓果红。

### 11.2 核心组件

- Bird Card
- Plant Card
- Location Badge
- Seasonal Presence Chart
- Diet and Feeder Matrix
- Attraction Checklist
- Safety Alert
- Source Citation
- Planner Recommendation Card
- Comparison Table

### 11.3 转化路径

```text
Search landing page
  → Useful answer
  → Related bird/plant/feeder exploration
  → Personalized Planner CTA
  → Plan result
  → Product click / save plan / email reminder
```

## 12. 商业化方案

### 12.1 联盟营销

适用品类：

- 喂食器
- 鸟食和储存容器
- Bird bath 和加热器
- 防松鼠装置
- 窗户防撞产品
- 园艺用品

商品模块应解决具体选择问题，并清晰标识广告或联盟关系。不要让商品模块覆盖页面核心知识内容。

### 12.2 高级 Planner

免费版：基础鸟种、植物、食物和喂食器建议。  
高级版可提供：

- 多区域庭院布局
- 全年开花/结果时间线
- 预算与采购清单
- 保存多个庭院
- 季节提醒
- 进度记录和照片
- 可下载报告

### 12.3 广告

展示广告应晚于产品与内容验证，且避免破坏现场识别、诊断和 Planner 使用体验。

## 13. 分阶段实施路线图

### Phase 0：基础设计与数据验证（2–4 周）

- 确定品牌、设计系统和内容语气
- 完成实体关系与数据库 Schema
- 审核数据许可和图片方案
- 建立 20 个代表性页面的数据样本
- 定义质量评分、索引门槛和编辑流程

交付物：数据字典、设计原型、来源登记表、内容规范。

### Phase 1：MVP（6–10 周）

- 首页与全部 Hub
- 100 个高需求鸟种页
- 25 个州级页面
- 30–50 个植物页或主题页
- 15–25 个喂食器/食物页
- 20 个问题诊断页
- Planner v1 规则引擎
- Sitemap、canonical、Schema、分析和监控

目标：约 200 个高质量可索引页面，验证收录、用户行为和 Planner 转化。

### Phase 2：主题权威扩展（8–12 周）

- 扩展至 300–500 个鸟种
- 覆盖 50 州
- 建立植物百科和区域原生植物映射
- 增加季节数据、食物与喂食器关系页
- 上线编辑后台、数据质量仪表盘和自动回归检查

目标：500–1,000 个可索引页面，并形成完整知识图谱。

### Phase 3：本地化与商业化（持续）

- 仅为有需求和数据支持的城市发布页面
- 扩展季节页和诊断页
- 上线 Planner 账户、保存、提醒和付费功能
- 加入联盟商品匹配和效果实验
- 根据 Search Console 查询发现新页面机会

### Phase 4：规模化（持续）

- 逐步达到 5,000–10,000 个高质量页面
- 扩展加拿大或其他英语市场
- 建立专家审核与社区数据反馈机制
- 加入庭院进度、观测记录和更精细的推荐模型

## 14. MVP 优先级

### 必须上线

- 鸟种百科
- 州级鸟类页
- 精选植物、食物和喂食器页
- 问题诊断
- Planner v1
- 可靠来源、更新时间和安全提示
- 技术 SEO 基础设施

### 暂缓

- 3,000 个城市页面
- 机械生成的 Bird × Food 全组合
- 全球鸟种覆盖
- 大量无差异季节页
- 未经验证的 AI 自由生成建议
- 用户公开投稿和社区功能

## 15. 团队与运营流程

建议最小团队职责：

- 产品/SEO：页面机会、搜索意图和路线图
- 数据工程：导入、规范化、关系和更新任务
- 全栈工程：网站、CMS、Planner 和基础设施
- 内容编辑/鸟类研究：事实审核和表达质量
- 园艺专家顾问：植物地域性、安全性和种植建议
- 设计：页面系统、信息可视化和 Planner 体验

发布流程：数据变更 → 自动检查 → 编辑审核 → 预览 → 发布 → 收录与行为监控 → 定期复核。

## 16. 风险与应对

| 风险 | 影响 | 应对 |
|---|---|---|
| 批量薄内容 | 不收录或整体质量下降 | 按搜索需求和质量评分逐批发布 |
| 数据许可不清 | 法律与业务风险 | 建立来源登记和字段级许可审计 |
| 鸟种/植物地域错误 | 损害信任 | 规则校验、来源展示和专家复核 |
| AI 幻觉 | 产生错误建议 | AI 只解释已验证的结构化事实 |
| 图片版权 | 下架或索赔 | 只使用有明确授权的素材 |
| 页面互相竞争 | 排名分散 | 定义唯一意图、canonical 和合并策略 |
| 联盟内容过重 | 体验与信任下降 | 内容优先、披露关系、明确评选标准 |
| 城市数据稀疏 | 页面高度重复 | 无独特价值则不索引或不生成 |
| 季节和观测数据波动 | 信息过时 | 标明数据周期并定期重算 |

## 17. 上线验收标准

### 内容

- 每页核心事实有可追踪来源。
- 页面不存在明显字段占位、重复段落或矛盾建议。
- 鸟名、学名、地区、季节和植物关系通过校验。
- 医疗、疾病、毒性和野生动物安全内容有明确审查规则。

### SEO

- 唯一 title、H1、description 和 canonical。
- 正确状态码、面包屑、站点地图和 robots 规则。
- 结构化数据与可见内容一致。
- 无孤立页面，无大量参数索引。
- 核心页面在移动端达到良好性能目标。

### 产品

- Planner 推荐可解释、可追溯且符合地区条件。
- 用户可返回修改输入。
- 无结果时提供明确替代方案。
- 联盟链接、隐私说明和免责声明完整。

## 18. 首批内容建议

首批鸟种应采用“搜索需求 × 庭院常见度 × 可行动性 × 数据完整度”评分选择，例如：

- Northern Cardinal
- American Robin
- Blue Jay
- Black-capped Chickadee
- House Finch
- American Goldfinch
- Mourning Dove
- Downy Woodpecker
- Red-bellied Woodpecker
- White-breasted Nuthatch
- Ruby-throated Hummingbird
- Anna's Hummingbird
- Dark-eyed Junco
- Tufted Titmouse
- Carolina Wren

首批州级页应覆盖人口、园艺活跃度、鸟类差异和商业需求较高的州，再补齐全部 50 州。城市页在 Search Console 或关键词研究证实需求后逐批建立。

## 19. 最终建议

AttractBirds.app 的优势不在“生成一万个页面”，而在于把鸟、地点、食物、植物、喂食器和季节组织成可信、可行动的知识图谱。正确实施顺序是：

1. 先验证数据权利和实体模型。
2. 用约 200 个高质量页面验证模板与收录。
3. 用 Planner 把内容流量转化为个性化价值。
4. 根据真实搜索需求和用户行为扩展组合页。
5. 保持所有推荐可解释、可追踪和适用于当地。

这样可以在控制内容质量与合规风险的同时，逐步实现 8,000–10,000 页的长期规模目标。
