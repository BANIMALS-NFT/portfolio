<script>
(function(){
  const canvas = document.getElementById("stars");
  if(!canvas) return;

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;

  const stars = [];
  const STAR_COUNT = 90;

  function resize(){
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
  }

  function rand(min, max){
    return Math.random() * (max - min) + min;
  }

  function seed(){
    stars.length = 0;
    for(let i = 0; i < STAR_COUNT; i++){
      stars.push({
        x: rand(0, w),
        y: rand(0, h),
        z: rand(0.2, 1.0),
        r: rand(0.6, 1.8),
        vx: rand(-0.06, 0.06),
        vy: rand(0.02, 0.12)
      });
    }
  }

  function step(){
    ctx.clearRect(0, 0, w, h);

    for(const s of stars){
      s.x += s.vx * (0.6 + s.z);
      s.y += s.vy * (0.6 + s.z);

      if(s.y > h + 10) s.y = -10;
      if(s.x > w + 10) s.x = -10;
      if(s.x < -10) s.x = w + 10;

      const alpha = 0.12 + s.z * 0.45;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }

  window.addEventListener("resize", function(){
    resize();
    seed();
  });

  resize();
  seed();
  step();
})();
</script>
