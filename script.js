// Hide the docs section initially
$("#docs").hide();

// Click a button to toggle the visibility of the docs section
$("#show-docs-button").click(function () {
  if ($("#docs").is(":visible")) {
    $("#docs").hide(500);

    $("#show-docs-button").text("Show documentation");
  } else {
    $("#docs").show(500);

    $("#show-docs-button").text("Hide documentation");

    // Scroll to bottom for a nicer effect
    $("html, body").animate(
      {
        scrollTop: $(document).height(),
      },
      500
    );
  }
});

// Initialize the canvas
const c = $("#canvas")[0];
const ctx = c.getContext("2d");

// Number of degrees for the arms to rotate
let deg = 0;

// Number of degrees for the angle to change in each frame
let delta = 70 / 0.15 / 60;

function drawCanvas() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();

  const isHovered = $("#canvas").is(":hover");

  ctx.fillStyle = isHovered ? "#c2ffca" : "#ffc2c2";
  ctx.fillRect(0, 0, 600, 400);

  ctx.lineWidth = 3;

  // Body
  ctx.moveTo(240, 380);
  ctx.lineTo(300, 280);
  ctx.moveTo(360, 380);
  ctx.lineTo(300, 280);
  ctx.moveTo(300, 280);
  ctx.lineTo(300, 160);

  // Arms
  if (isHovered) {
    ctx.stroke();
    ctx.save();

    ctx.translate(300, 180);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.translate(-300, -180);

    ctx.moveTo(190, 180);
    ctx.lineTo(410, 180);

    ctx.stroke();
    ctx.restore();
  } else {
    ctx.moveTo(300, 180);
    ctx.lineTo(240, 260);
    ctx.moveTo(300, 180);
    ctx.lineTo(360, 260);
  }

  // Head
  ctx.moveTo(360, 100);
  ctx.arc(300, 100, 60, 0, Math.PI * 2, true);

  // Mouth
  ctx.moveTo(265, 120);
  if (isHovered) {
    ctx.stroke();
    ctx.lineWidth = 2;

    ctx.moveTo(330, 120);
    ctx.ellipse(300, 120, 30, 15, 0, 0, Math.PI * 2);
  } else {
    ctx.lineTo(335, 120);
  }

  // Tears
  if (!isHovered) {
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.strokeStyle = "blue";

    ctx.moveTo(275, 95);
    ctx.arc(275, 95, 1, 0, Math.PI * 2, true);
    ctx.moveTo(274, 102);
    ctx.arc(274, 102, 1, 0, Math.PI * 2, true);
    ctx.moveTo(273, 109);
    ctx.arc(273, 109, 1, 0, Math.PI * 2, true);

    ctx.moveTo(325, 95);
    ctx.arc(325, 95, 1, 0, Math.PI * 2, true);
    ctx.moveTo(326, 102);
    ctx.arc(326, 102, 1, 0, Math.PI * 2, true);
    ctx.moveTo(327, 109);
    ctx.arc(327, 109, 1, 0, Math.PI * 2, true);

    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "black";
  }

  ctx.stroke();
  ctx.lineWidth = 2;

  // Left eye
  ctx.moveTo(290, 80);
  ctx.arc(280, 80, 10, 0, Math.PI * 2, true);
  ctx.moveTo(280, 80);
  ctx.arc(280, 80, 2, 0, Math.PI * 2, true);

  // Right eye
  ctx.moveTo(330, 80);
  ctx.arc(320, 80, 10, 0, Math.PI * 2, true);
  ctx.moveTo(320, 80);
  ctx.arc(320, 80, 2, 0, Math.PI * 2, true);

  ctx.stroke();

  // Update the angle for the arms
  deg += delta;

  // Reverse animation direction when angle exceeds 35 degrees
  if (deg <= -35 || deg >= 35) {
    delta = -delta;
  }

  requestAnimationFrame(drawCanvas);
}

// Start the animation
requestAnimationFrame(drawCanvas);
