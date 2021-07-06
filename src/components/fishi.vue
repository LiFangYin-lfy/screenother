<template>
  <div class="zik">
    <div class="niao">
      <div></div>
      <div>鸟类</div>
    </div>
    <div class="fishi">
      <div></div>
      <div>鱼类</div>
    </div>
    <div class="shen">
      <div></div>
      <div>生物</div>
    </div>
    <div class="hai">
      <div></div>
      <div>海草</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.zik {
    height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.fishi {
  width: .65rem;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.fishi > div:first-child {
 width: .8125rem;
  height: .4rem;
  background: url(../assets/yu.png) no-repeat center rgba(92, 210, 255, 0.15);
  /* border: 1px red solid; */
  background-size: .225rem .225rem;
  border-radius: 50%;
}
.fishi > div:last-child {
  width: 0.625rem;
  height: 0.4rem;
  line-height: 0.4rem;
  visibility: hidden;
  display: flex;
}
.fishi:hover {
  width: 1.375rem;
  border: 1px solid #5cf6fb;
  border-radius: 0.1875rem;
  transition: 0.5s;
}
.fishi:hover > div:first-child {
  background: url(../assets/yuS.png) no-repeat center;
}
.fishi:hover > div:last-child {
  width: 0.625rem;
  text-align: center;
  visibility: visible;
  color: #5cf6fb;
}

.niao {
  width: .65rem;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.niao > div:first-child {
  width: .8125rem;
  height: .4rem;
  background: url(../assets/niao.png) no-repeat center rgba(92, 210, 255, 0.15);
  background-size: .225rem .225rem;
  border-radius: 50%;
}
.niao > div:last-child {
  width: 0.625rem;
  height: 0.4rem;
  line-height: 0.4rem;
  visibility: hidden;
  display: flex;
}
.niao:hover {
  width: 1.375rem;
  border: 1px solid #5cf6fb;
  border-radius: 0.1875rem;
  transition: 0.5s;
}
.niao:hover > div:first-child {
  background: url(../assets/niaoS.png) no-repeat center;
}
.niao:hover > div:last-child {
  width: 0.625rem;
  text-align: center;
  visibility: visible;
  color: #5cf6fb;
}

.shen {
   width: .65rem;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.shen > div:first-child {
   width: .8125rem;
  height: 0.4rem;
  background: url(../assets/shengwu.png) no-repeat center rgba(92, 210, 255, 0.15);
  border-radius: 50%;
}
.shen > div:last-child {
    width: .8125rem;
  height: 0.4rem;
  line-height: 0.4rem;
  visibility: hidden;
  display: flex;
}
.shen:hover {
  width: 1.375rem;
  border: 1px solid #5cf6fb;
  border-radius: 0.1875rem;
  transition: 0.5s;
}
.shen:hover > div:first-child {
  background: url(../assets/shengwuS.png) no-repeat center;
}
.shen:hover > div:last-child {
  width: 0.625rem;
  text-align: center;
  visibility: visible;
  color: #5cf6fb;
}

.hai {
  width: .65rem;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.hai > div:first-child {
   width: .8125rem;
  height: 0.4rem;
  background: url(../assets/haicao.png) no-repeat center rgba(92, 210, 255, 0.15);
  border-radius: 50%;
}
.hai > div:last-child {
  width: 0.625rem;
  height: 0.4rem;
  line-height: 0.4rem;
  visibility: hidden;
  display: flex;
}
.hai:hover {
  width: 1.375rem;
  border: 1px solid #5cf6fb;
  border-radius: 0.1875rem;
  transition: 0.5s;
}
.hai:hover > div:first-child {
  background: url(../assets/haicaoS.png) no-repeat center;
}
.hai:hover > div:last-child {
  width: 0.625rem;
  text-align: center;
  visibility: visible;
  color: #5cf6fb;
}
</style>