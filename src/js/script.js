window.addEventListener("DOMContentLoaded", () => {
  /* mobile burger */
  const burger = document.querySelector(".promo__burger");
  const headerMenu = document.querySelector(".header");
  const button = document.querySelector(".button");
  const menuPhone = document.querySelector(".header__phone");

  const showHideBurger = () => {
    burger.classList.toggle("promo__burger_active");
    headerMenu.classList.toggle("header_active");
  };

  burger.addEventListener("click", () => {
    showHideBurger();
  });

  headerMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target === button || target === menuPhone) {
      showHideBurger();
    }
  });

  /* Tiny Slider */
  const slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    nav: false,
    navPosition: "bottom",
    responsive: {
      1200: {
        items: 1,
        nav: false,
      },
      992: {
        items: 1,
        nav: false,
      },
      768: {
        nav: true,
        items: 1,
      },
      576: {
        items: 1,
        nav: true,
      },
      320: {
        items: 1,
        nav: true,
      },
    },
  });

  document.querySelector(".prev").addEventListener("click", () => {
    slider.goTo("prev");
  });
  document.querySelector(".next").addEventListener("click", () => {
    slider.goTo("next");
  });
});

/* Tabs */

/* jquery script ---start */
$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
        $(".catalog-item__back").eq(i).toggleClass("catalog-item__list");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", () => {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__description").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        // simple rule, converted to {required:true}
        name: {
          required: true,
          minlength: 2,
        },
        tel: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя.",
          minlength: jQuery.validator.format("Пожалуйста ведите {0} символов"),
        },
        tel: "Пожалуйста, введите свой телефон.",
        email: {
          required: "Пожалуйста, введите свою почту.",
          email: "Введите корректный адрес почты",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=tel]").mask("+38 (999) 999-9999");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut("slow");
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  //Scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $(".pageup").fadeIn("slow");
    } else {
      $(".pageup").fadeOut("slow");
    }
  });

  $("a[href='#up']").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 750,
        easing: "swing",
      }
    );
    return false;
  });
  $("a[href='#catalog']").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 750,
        easing: "swing",
      }
    );
    return false;
  });

  /* init wowJS */
  new WOW().init();
});
/* jquery script ---end */
