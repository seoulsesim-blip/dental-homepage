# 틀 4 · 한 문장씩 넘기는 형 (코치용 안내)

## 이 틀
짙은 청록(`--teal`)과 흰색 바탕에 명조(Noto Serif KR) 큰 글자, 화면 하나에 문장 하나. 코랄(`--coral`)은 알약 버튼과 작은 점에만 쓴다. 이 틀답게 만드는 것: (1) `data-split` 제목이 단어별로 솟아오르는 문장 장면(`.scene`), (2) 원장 소개 장면(`.pillars`)이 화면에 고정된 채 스크롤에 따라 진료 원칙 3개가 차례로 바뀐다(GSAP ScrollTrigger). 이 둘이 이 틀의 정체다.
글꼴: 제목 `--serif`(Noto Serif KR 400/500), 본문 `--sans`(Pretendard Variable), head의 `<link>`로 CDN. 색 토큰은 `style.css` 맨 위 `:root`: `--teal` `--deep` `--pale` `--pale2` `--coral` `--ink` `--muted` `--line` `--ease` `--serif` `--sans`. 사진: 필수는 아니지만 첫 화면 배경과 원장 마름모가 분위기를 만든다(사진 없으면 해당 `<img>`만 제거, 청록 바탕으로 남음).

## 바꿀 예시 값
방법: 아래 표를 위에서 아래 순서대로, 행마다 `index.html`에 Edit 도구의 replace-all(전체 바꾸기)을 한 번씩 한다. 이 틀의 파일에는 이 문자열들이 글자 그대로 들어 있어 검색해서 바꾸기만 하면 된다. 변환·인코딩·계산은 필요 없다(전화 링크 `tel:02-000-0000`과 지도 주소도 화면 글자와 같은 문자열이다). sed·perl은 쓰지 않는다. 사용자에게서 받지 못한 항목은 번호·주소·시간을 지어내지 말고 셋째 열의 마커를 그대로 넣는다. 파일에 없는 문자열(0건)은 건너뛴다. 끝나면 `grep -n "예시\|샘플\|02-000\|세종대로\|시청역\|000-00-00000\|Pexels\|시안" index.html` 결과가 비어야 하고, `{확인 필요` 검색으로 남은 마커를 사용자에게 알린다.

| 바꿀 문자열 | 무엇 | 못 받았을 때 넣을 마커 |
|---|---|---|
| `예시치과의원` | 병원 이름 전체. 로고·제목·alt·지도 제목·푸터 등 파일 안 모든 곳 | `{확인 필요: 병원 이름}` |
| `예시치과` | 병원 이름 짧은 형. 위 행을 먼저 바꾼 뒤에 바꾼다(없는 틀도 있다) | `{확인 필요: 병원 짧은 이름}` |
| `김예시` | 대표원장 이름. 대표자 표기도 같은 이름 | `{확인 필요: 대표원장 이름}` |
| `이예시` | 두 번째 원장 이름 | `{확인 필요: 두 번째 원장 이름}` |
| `보존과 · 임플란트` | 대표원장 전문 분야 | `{확인 필요: 전문 분야}` |
| `치의학 학사·석사` | 약력 1 | `{확인 필요: 약력 1}` |
| `보존과 수련` | 약력 2 | `{확인 필요: 약력 2}` |
| `진료 경력 15년` | 약력 3 | `{확인 필요: 약력 3}` |
| `대한치과의사협회 정회원` | 약력 4 | `{확인 필요: 약력 4}` |
| `02-000-0000` | 전화번호. 화면 글자와 `tel:` 링크가 같은 문자열 | `{확인 필요: 전화번호}` |
| `서울특별시 중구 세종대로 110` | 도로명주소. 화면 글자, 지도 iframe, 구글·네이버 지도 링크 모두 글자 그대로 | `{확인 필요: 도로명주소}` |
| `2층` | 층 표기 | `{확인 필요: 층}` |
| `지하철 1·2호선 시청역 5번 출구에서 걸어서 3분` | 대중교통 안내 | `{확인 필요: 대중교통}` |
| `건물 지하 주차장 1시간 무료` | 주차 안내 | `{확인 필요: 주차}` |
| `09:30–18:30` | 월·화·목·금 진료 시간 | `{평일 시간}` |
| `09:30–20:30` | 수요일 야간진료 시간 | `{야간 시간}` |
| `09:30–14:00` | 토요일 진료 시간 | `{토요일 시간}` |
| `13:00–14:00` | 점심시간 | `{점심 시간}` |
| `000-00-00000` | 사업자등록번호 | `{확인 필요: 사업자등록번호}` |

진료 시간 4행(`09:30–18:30` `09:30–20:30` `09:30–14:00` `13:00–14:00`)은 첫 요청에서 원장에게 묻지 않고 받지 않는다. 받지 못한 상태면 이 4행을 위 셋째 열의 마커 `{평일 시간}` `{야간 시간}` `{토요일 시간}` `{점심 시간}`으로 바꾼다(정확히 이 글자, 시간을 지어내지 않는다). 마커가 화면에 남아 있어도 화면은 깨지지 않고, 점 시간표(틀 3)·요일 칩(틀 5)처럼 시간에서 만들어지는 시각물은 오류 없이 비어 있다. 나중에 원장이 시간을 알려 주면 마커를 `10:00–19:00` 형식의 실제 값(24시간제 `HH:MM–HH:MM`, 가운데 줄은 `–`, 쉬는 날은 `휴진`)으로 Edit replace-all 한다. 마커 하나당 한 번이고, 그러면 파생 시각물도 값에 맞게 그려진다. 시간 설명 문장이 마커와 같이 어색해 보이면 그 문장도 고쳐 쓴다.

### 고쳐 써도 되는 문구 (선택, 사진·표의 자료가 아니라 병원이 원할 때만)
- 제목·설명: `<title>`의 `설명을 먼저 드리고, 치료는 그다음입니다`와 meta description의 `설명을 먼저 드리고 필요한 치료만 권하며, 같은 원장이 처음부터 끝까지 봅니다.`는 병원 소개로 고쳐 쓴다(병원 이름은 위 표로 이미 바뀌어 있다).
- 문장 장면 3개: `설명을 먼저 드리고, 치료는 그다음입니다.` / `필요한 치료만 권합니다.` / `같은 원장이 처음부터 끝까지 봅니다.` 와 각 `.sub`(`지금 필요하지 않은 치료는 권하지 않습니다.` `처음 상담한 원장이 마지막 점검까지 맡습니다.`)
- 진료 원칙 3개(`.pl__label`·`.pl__desc`): `설명을 먼저` `치료 방법과 순서를 진료 전에 충분히 설명드립니다.` / `필요한 치료만` / `같은 원장이 끝까지`, 소제목 `진료실에서 지키는 세 가지 원칙입니다.`
- 약력 장면: `학력과 수련, 경력과 소속, 전문 분야, 진료진을 안내합니다.`, 묶음 제목 `학력과 수련` `경력과 소속` `전문 분야` `진료진`
- 제목: `여섯 가지 진료를 합니다.` / `진료마다 방법과 순서를 먼저 설명드립니다.` / `진료 공간을 소개합니다.` / `진료실과 진료 기구를 사진으로 먼저 보실 수 있습니다.` / `진료 시간을 안내합니다.` / `일요일과 공휴일은 쉽니다.`
- 진료 과목 6개(이름 → 한 줄 설명, 병원 진료 과목에 맞게 고쳐 쓴다):
  - `임플란트` → `빠진 치아 자리에 인공 치근을 심어 씹는 기능을 회복하는 치료입니다.`
  - `치아교정` → `고르지 않은 치열을 단계별 계획에 따라 천천히 맞춥니다.`
  - `충치·신경치료` → `충치의 깊이를 확인하고 치아를 가능한 한 보존하는 방향으로 치료합니다.`
  - `스케일링·잇몸치료` → `치석과 잇몸 염증을 관리해 잇몸 건강을 유지하도록 돕습니다.`
  - `심미·미백` → `치아 색과 모양을 자연스럽게 다듬는 치료를 상담 후 진행합니다.`
  - `소아치과` → `아이가 낯선 진료실에 익숙해질 수 있도록 설명하며 진료합니다.`

## 섹션
| id | 무엇 | 필수/선택 | 내용이 없으면 |
|---|---|---|---|
| (id 없음) `.hero` | 첫 화면 한 문장+배경 사진 | 필수 | 사진 없으면 `.hero__bg`만 삭제 |
| `#second` + 다음 흰 장면 | 문장 장면 2개 | 선택 | 장면 `<section>`을 통째로 삭제(`.cue`의 `#second` 링크는 `#doctor`로) |
| `#doctor` | 고정 장면: 진료 원칙 3개+마름모 사진 | 선택 | 섹션 삭제 + 헤더 `<a class="chip" href="#doctor">` 삭제 |
| (id 없음) `.nlist` | 약력 번호 목록·진료진 | 선택 | 섹션 삭제(링크 없음) |
| `#care` | 진료 과목 행+원형 사진 | 필수 | 헤더 `#care` 칩도 삭제 |
| `#space` | 시설 사진 도형 4개 | 선택 | 섹션 삭제 + 헤더 `#space` 칩 삭제 |
| `#hours` | 진료 시간 | 필수 | 헤더 칩 정리 |
| `#visit` | 오시는 길·지도 | 필수 | 지도만 없으면 `.map` 삭제 |
`#doctor`를 지우면 script.js의 고정 장면 코드는 대상이 없어 건너뛴다(오류 없음).

## 사진 자리
이 틀의 이미지는 모두 번호가 있다. 번호는 화면 순서대로 1부터이고, 번호 하나가 파일 하나·문자열 하나다. 원장·의료진 소개용 인물 사진 자리만 자리 표시 그림(`images/slot-N.svg`)이고 나머지는 예시 사진(`images/photo-N.jpg`)이다.
| 번호 | 파일 | 종류 | 어디에 있는 사진인지 |
|---|---|---|---|
| 1 | `images/photo-1.jpg` | 예시 사진 | 첫 화면 배경 `.hero__bg`(가로, 청록 막이 덮임) |
| 2 | `images/slot-2.svg` | 자리 표시 | `#doctor` 마름모 `.diamond__in`의 김예시 대표원장(세로) |
| 3 | `images/slot-3.svg` | 자리 표시 | 약력 `4.1` 김예시 대표원장 작은 원 `.av`(40px, 번호만 보인다) |
| 4 | `images/slot-4.svg` | 자리 표시 | 약력 `4.2` 이예시 원장 작은 원 `.av`(40px, 번호만 보인다) |
| 5 | `images/photo-5.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 1번째, 진료 과목 `임플란트` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 6 | `images/photo-6.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 2번째, 진료 과목 `치아교정` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 7 | `images/photo-7.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 3번째, 진료 과목 `충치·신경치료` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 8 | `images/photo-8.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 4번째, 진료 과목 `스케일링·잇몸치료` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 9 | `images/photo-9.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 5번째, 진료 과목 `심미·미백` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 10 | `images/photo-10.jpg` | 예시 사진 | `#care` 원형 `.pv__circle` 6번째, 진료 과목 `소아치과` 줄에 맞춰 보이는 사진(1100px 이하에서 숨김) |
| 11 | `images/photo-11.jpg` | 예시 사진 | `#space` 원 `.sh--c1` |
| 12 | `images/photo-12.jpg` | 예시 사진 | `#space` 마름모 `.sh__in` |
| 13 | `images/photo-13.jpg` | 예시 사진 | `#space` 캡슐 `.sh--cap` |
| 14 | `images/photo-14.jpg` | 예시 사진 | `#space` 원 `.sh--c2` |

사진 자리 규칙:
- 원장이 "N번 자리에 이미지 넣어줘"(또는 "N번 사진")라고 하면, 위 표에서 그 번호의 파일 경로(예: `images/photo-5.jpg`, `images/slot-8.svg`)를 찾는다. 받은 사진 파일을 `images/` 안에 두고, `index.html`에서 그 경로 문자열을 새 파일 경로(예: `images/director.jpg`)로 Edit replace-all 한 번에 바꾼다. 이 문자열은 파일 안에 그 번호 한 곳뿐이다.
- `images/slot-N.svg`·`images/photo-N.jpg` 파일은 지우지 않는다(다른 작업과 나중에 다시 바꿀 때 쓴다).
- 사진을 아직 받지 못했으면 그 번호는 바꾸지 말고 원장에게 사진을 달라고 한다. 그대로 두어도 화면이 깨지지 않는다.
- 번호는 이 틀에서 화면 순서대로 1부터 한 줄로 매긴 것이다. 번호가 곧 표의 한 줄이다.
- 자리 표시 그림에는 글자 `이 자리에 사진을 배치해주세요`와 `(자리 N번)`이 들어 있다. 아주 작은 원형 자리(약 40~85px)에는 번호만 보인다. 원장·의료진 소개용 인물 사진은 병원과 무관한 모델 사진으로 채우지 않고 자리 표시로 둔다.
- 예시 사진(`photo-N.jpg`)은 병원과 무관한 샘플이다(진료 장면의 인물은 모델). 게시 전에 실제 병원 사진으로 바꾸거나 그 블록을 지운다.

## 고칠 때
- 색: 배경 청록은 `--teal`, 더 짙은 장면·푸터는 `--deep`. 같이 바꿀 파생값: `.foot`의 `#022626`, `.pv__circle`의 `#0a6a69`, `.map`의 `#0b4a49`, `rgba(0,84,83,…)`(`.nl__g`, `.trow` 테두리), `#cfdada` `#5d7776` `#e6f0ef` `#b9cfce` `#cfe0df`, `--pale` `--pale2` `--muted` `--line`, 그리고 `index.html`의 SVG `#plArc` `stroke="#005453"`·`#c9d6d6`. 코랄은 `--coral`과 hover `#ff7777`뿐(알약 글자색은 `--deep`라 명암비가 유지된다).
- 진료 시간: 표의 시간 4개를 replace-all(시간을 받지 못했으면 표 셋째 열의 `{평일 시간}` `{야간 시간}` `{토요일 시간}` `{점심 시간}`을 그대로 넣고, 나중에 `10:00–19:00` 형식의 실제 값을 받으면 이 마커를 하나씩 replace-all 한다)하면 끝이다. 요일 구성이 다르면 `.trow`(`<dt>` 요일, `<dd>` 시간) 줄을 복사·삭제한다. `#hours` 제목 문장은 시간을 쓰지 않는다.
- 진료 과목 추가·삭제: ① `.rows`에 `<li class="row">` 복사(`.row__n` 번호 이어서). ② `.pv__circle`에 `<img>` 하나 추가(줄 개수와 같게, 줄 순서와 1:1). ③ `style.css`의 `.care:has(.row:nth-child(6):hover) .pv__circle img:nth-child(6)` 줄을 새 번호로 한 쌍 더 만든다(6개를 넘길 때만). ④ `여섯 가지 진료를 합니다.`의 개수 문구. 줄을 줄이면 해당 `<img>`도 함께 지운다.
- 진료 원칙 개수 바꾸기: `#plList`의 `.pl__item`과 `#plDots`의 `<i>`를 같은 개수로 맞추고(첫 항목만 `is-on`, 첫 `<i>`만 `class="on"`). 숫자 `#plNum`은 스크립트가 `01`, `02`…로 채운다. 3개를 유지하는 편이 가장 안전하다.
- 원장 추가: 마름모 사진은 1명용이다. 두 번째 원장은 `.nl__sub`의 `<li><span>4.3</span><img class="av" …>이름</li>`를 복사한다.
- 제목 규칙: `data-split` 요소는 스크립트가 글자를 단어(공백 기준)로 쪼개 다시 만든다. `<br>` `<em>` `<mark>` 같은 안쪽 태그를 넣으면 사라진다. 줄바꿈을 막을 공백은 nbsp 엔티티를 쓴다.
- 사진 교체: `src`·`alt`만. 첫 화면 배경은 스크롤에 따라 확대/이동하고 `.hero__shade`가 덮으니 가로 사진을 쓴다.

## 덧붙일 때
새 장면 색은 어두운 `scene--teal`/`scene--deep`(흰 글자)와 밝은 `scene--white`/`.s-pale`(청록 글자)을 번갈아 쓴다. 어두운 장면 뒤에는 밝은 장면, 같은 색 연속은 피한다. 제목은 항상 `.display`(명조 큰 글자)에 `data-split`, 보조 문장은 `data-rise`.
```html
<section class="scene scene--white" aria-labelledby="h-new">
  <div class="scene__in">
    <h2 id="h-new" class="display display--m ink" data-split>한 문장.</h2>
    <p class="sub sub--ink" data-rise>보조 문장 한 줄.</p>
  </div>
</section>
```
어두운 장면은 `scene--teal`로 하고 `ink`·`sub--ink`를 뺀다. 라벨은 `<p class="eyebrow"><i class="dot" aria-hidden="true"></i>이름</p>`. 헤더 `<nav class="chips">`에 `<a class="chip" href="#new">이름</a>`을 더한다. 공지·휴진 팝업: `</footer>` 바로 뒤, 끝의 `<script …>` 줄들 위에 `<dialog>`를 넣는다(팝업 스크립트가 실행될 때 `#notice`가 이미 있어야 한다. `</body>` 바로 앞이라도 `<script>` 줄보다 위여야 한다). `data-until`은 팝업을 보여 주는 마지막 날(`YYYY-MM-DD`)이며 원장에게 받아야 한다. 열기·닫기·오늘 하루 보지 않기 동작은 `dental-design` 스킬의 팝업 스크립트를 `script.js` 맨 끝에 한 번만 덧붙여 쓴다(이 안내문에는 스크립트를 넣지 않는다, `<form method="dialog">`와 인라인 `<script>`도 쓰지 않는다). 아래 CSS는 `style.css` 맨 끝에 덧붙인다.
```html
<dialog class="notice" id="notice" data-until="YYYY-MM-DD">
  <h2 class="h2">공지 제목</h2>
  <p class="sub">공지 내용 한두 문장.</p>
  <div class="notice__btns">
    <button type="button" class="pill pill--ghost" data-notice="today">오늘 하루 보지 않기</button>
    <button type="button" class="pill pill--coral" data-notice="close" autofocus>닫기</button>
  </div>
</dialog>
```
```css
.notice { border: 0; padding: 40px 36px; border-radius: 28px; width: calc(100% - 40px); max-width: 480px; background: var(--teal); color: #fff; }
.notice::backdrop { background: rgba(3, 48, 48, 0.7); }
.notice .h2 { color: #fff; font-size: 28px; }
.notice .sub { margin: 12px 0 26px; }
.notice__btns { display: flex; flex-wrap: wrap; gap: 10px; }
.notice button { font-family: inherit; cursor: pointer; }
```
- 새 쪽(하위 페이지): 아래는 진료 과목 안내 쪽(`implant.html`) 한 장의 전체다. 새 파일을 `index.html`과 같은 폴더에 만들고(같은 `style.css`·`script.js`를 쓴다), 제목·소개 문장·진료 순서 목록만 바꾼다(순서 목록이 필요 없으면 해당 `<section>`을 지운다). 표의 문자열(병원 이름·전화번호·주소 등)은 `index.html`에서 바꾼 값과 똑같이 바꾼다. 헤더의 `<nav>` 링크는 `index.html`의 것과 같게 두고 앞에 `index.html`만 붙인다(`index.html`에서 지운 구역의 링크는 여기서도 지운다). 아래 CSS를 `style.css` 맨 끝에 덧붙인다(이미 있으면 다시 넣지 않는다).
```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>임플란트 | 예시치과의원</title>
<meta name="description" content="예시치과의원의 임플란트 안내입니다. 빠진 치아 자리에 인공 치근을 심어 씹는 기능을 회복하는 치료입니다.">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr@5.3.0/400.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr@5.3.0/500.css">
<link rel="stylesheet" href="style.css">
<script>
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("js");
</script>
</head>
<body class="subpage">
<header class="top">
  <a class="brand" href="index.html" aria-label="예시치과의원 처음으로">
    <svg width="44" height="22" viewBox="0 0 44 22" aria-hidden="true"><rect x="1" y="1" width="20" height="20" rx="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="33" cy="11" r="10" fill="currentColor"/></svg>
    <span>예시치과의원</span>
  </a>
  <nav class="chips" aria-label="주요 메뉴">
    <a class="chip" href="index.html#doctor">원장 소개</a>
    <a class="chip" href="index.html#care">진료 과목</a>
    <a class="chip" href="index.html#space">시설</a>
    <a class="chip" href="index.html#hours">진료 시간</a>
    <a class="chip" href="index.html#visit">오시는 길</a>
  </nav>
  <a class="pill pill--coral top__cta" href="tel:02-000-0000">전화 문의</a>
</header>
<main id="top">
  <section class="scene scene--white" aria-labelledby="page-title">
    <div class="scene__in">
      <h1 id="page-title" class="display display--m ink" data-split>임플란트</h1>
      <p class="sub sub--ink" data-rise>빠진 치아 자리에 인공 치근을 심어 씹는 기능을 회복하는 치료입니다.</p>
      <p class="visit__btns"><a class="pill pill--coral" href="tel:02-000-0000">전화 문의 02-000-0000</a></p>
    </div>
  </section>
  <section class="hours s-pale" aria-labelledby="steps-title">
    <div class="hours__in">
      <p class="eyebrow"><i class="dot" aria-hidden="true"></i>진료 순서</p>
      <h2 id="steps-title" class="display display--m ink" data-split>처음부터 끝까지.</h2>
      <dl class="trows">
        <div class="trow"><dt>상담</dt><dd>불편한 점과 궁금한 점을 먼저 듣습니다.</dd></div>
        <div class="trow"><dt>검사</dt><dd>검사 결과를 화면으로 함께 보며 설명드립니다.</dd></div>
        <div class="trow"><dt>치료</dt><dd>동의하신 치료만 같은 원장이 진행합니다.</dd></div>
        <div class="trow"><dt>관리</dt><dd>치료 뒤 관리 방법을 안내합니다.</dd></div>
      </dl>
    </div>
  </section>
</main>
<footer class="foot">
  <div class="foot__in">
    <p class="foot__name">예시치과의원</p>
    <ul>
      <li>대표자 김예시</li>
      <li>주소 서울특별시 중구 세종대로 110, 2층</li>
      <li>전화 02-000-0000</li>
      <li>사업자등록번호 000-00-00000</li>
    </ul>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```
```css
.subpage .top { position: relative; background: var(--teal); }
```
- `index.html`에서 연결하기: `index.html`의 `#care`에서 임플란트 줄 `<h3 class="row__t">임플란트</h3>`를 `<h3 class="row__t"><a href="implant.html">임플란트</a></h3>`로 바꾼다.
- 버튼: `pill pill--coral`(기본), 어두운 바탕에서만 `pill pill--ghost`. 목록은 `.trows`/`.trow`(28px 둥근 줄)나 `.rows`/`.row`.
- 넣지 말 것: 새 색, 청록 계열 밖의 바탕, 코랄을 글자색이나 넓은 면에 쓰는 것, 그림자(이 틀엔 없음), 그라데이션, 이모지, 고딕(Pretendard)으로 된 큰 제목, `data-split` 안의 태그.
- 등장 애니메이션: 제목은 `data-split`, 문단은 `data-rise` 속성. 그 외 요소에 별도 클래스는 필요 없다. 안 붙인 요소는 그냥 정적으로 나온다.

## 움직임
`script.js`(GSAP+ScrollTrigger, CDN): (1) `[data-split]` 제목을 단어로 쪼개 한 번 솟아오르게, `[data-rise]` 문단은 아래서 떠오르게 한다. (2) 첫 화면 배경·링의 확대와 막 투명도를 스크롤에 연결한다. (3) `.pillars`를 `ScrollTrigger`로 화면 높이의 약 2.4배 동안 고정하고, 진행도에 따라 `.pl__item`의 `is-on`, `#plDots`의 `on`, `#plNum`, `#plArc` 호를 바꾼다. (4) `.sh` 도형을 한 번 나타나게 한다. 의존: `<html class="js">`, `[data-split]`, `[data-rise]`, `#plList`, `#plDots`, `#plNum`, `#plArc`, `.hero`. 움직임 줄이기 설정이면 `js` 클래스가 안 붙어 모든 장면이 정적으로 쌓여 보이고, GSAP CDN을 못 불러오면 스크립트가 `js`를 지워 같은 상태가 된다. 그때는 원칙 3개가 모두 펼쳐진다.
