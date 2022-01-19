
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/**
 * 쿠키를 가져오는 메서드.
 * @param cname - 쿠키 이름.
 * @returns {string}  쿠키 값.
 */
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 쿠키를 세팅해주는 메서드. (1주일)
 * @param cname - 쿠키이름
 * @param cvalue - 쿠키 값.
 *
 */
function setCookie(cname, cvalue, until) {
  var cuntil = until || new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  $.cookie(cname, cvalue, {path: '/', expires: cuntil});
}

function getParameter(param) {
  var returnValue;
  var url = location.href;
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split('=')[0];
    if (varName.toUpperCase() == param.toUpperCase()) {
      returnValue = parameters[i].split('=')[1];
      return decodeURIComponent(returnValue);
    }
  }
}

function getParameter_target_url(url, param) {
  var returnValue;
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split('=')[0];
    if (varName.toUpperCase() == param.toUpperCase()) {
      returnValue = parameters[i].split('=')[1];
      return decodeURIComponent(returnValue);
    }
  }
}

/**
 * 원하는 일수를 ms 단위로 리턴해줌.
 * @param day - 날 수
 * @returns {integer} - 날 수의 ms 단위
 */
function getDays(day) {
  var days,
      oneDay = 24 * 60 * 60 * 1000;

  if (day) {
    days = oneDay * parseInt(day);
  } else {
    days = oneDay;
  }

  return days;
}

/**
 * 현재 언어 설정을 리턴 해주는 메서드.
 * @returns {string} - 언어 설정 값.
 */
function getLanguage() {
  return get_language();
}

/**
 * 언어 설정을 바꿔주는 메서드.
 * @param language - 언어 이름.
 */
function changeLanguage(language) {
  //language Cookie key
  var languageKey = "language";

  setCookie(languageKey, language);
}

/**
 * 디테일 페이지의 picture를 laze 로딩 시켜주는 메서드.
 */
function photoLazyLoading() {
  var review_area = $(".picture_item");

  review_area.lazyload({
    // effect : "fadeIn"
  });
}

function showLodingblackScreen() {
  //검은 레이어 배경과 로딩바
  var $black_screen = $(".black_screen"),
      $loading_bar = $(".loading_bar");

  $black_screen.show();
  $loading_bar.show();
}

function hideLodingblackScreen() {
  //검은 레이어 배경과 로딩바
  var $black_screen = $(".black_screen"),
      $loading_bar = $(".loading_bar");

  $black_screen.hide();
  $loading_bar.hide();
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function go_to_top(self) {
  $('html,body').animate({scrollTop: 0}, 500, function() {
    $(self).fadeOut();
  });
}

function off_scroll() {
  $(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
    e.preventDefault();
    return;
  });
}

function on_scroll() {
  $(document).off(".disableScroll");
}

function str_cut(str, str_limit_length, prefix) {
  var prefix = prefix || "...";

  if (!str) {
    return "";
  }

  if (str.length > str_limit_length) {
    str = str.substring(0, str_limit_length - 1);
    str = str + prefix;
  }

  return str;
}

function go_to_app() {
  var is_android = false;
  var mobilewords = new Array("Android");
  for (var word in mobilewords) {
    if (navigator.userAgent.match(mobilewords[word]) != null) {
      is_android = true;
      location.href = "mangoplate://xn--main-ee6q572e";
      //setTimeout(function(){
      //    go_to_market();
      //}, 1500);
      break;
    }
  }

  var is_ios = false;
  var ios_words = new Array("iPhone", "iPod");
  for (var word in ios_words) {
    if (navigator.userAgent.match(ios_words[word]) != null) {
      is_ios = true;
      location.href = "mangoplate://xn--main-ee6q572e";
      //setTimeout(function(){
      //    go_to_market();
      //}, 1500);
      break;
    }
  }
}

function get_device_os_type() {
  var device_type = {
    "ios": false,
    "android": false,
    "androidChromeIntent": false,
    "androidChrome25over": false
  };

  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    device_type.ios = true;
  } else if (navigator.userAgent.match(/Android/i)) {
    device_type.android = true;

    var chromeString = navigator.userAgent.match(/Chrome\/[0-9]*/g);

    // 크롬 중에 intent로만 호출되는 버전 확인.
    var supportsIntent = chromeString && chromeString[0].split('/')[1] >= 25;
    if (supportsIntent) {
      device_type.androidChromeIntent = true;
    }

    var is_matched = navigator.userAgent.match(/WebKit\/[^\ ]*/);

    if (is_matched) {
      device_type.androidChrome25over = parseFloat(is_matched[0].toLowerCase().substr(7)) > 537.22;
    } else {
      device_type.androidChrome25over = false;
    }

  }

  return device_type;
}

function go_to_app_restaurant(restaurant_uuid) {
  if (!restaurant_uuid) {
    return false;
  }

  var service_info = {
        "scheme_url": "mangoplate://restaurant_detail?restaurant_uuid=" + restaurant_uuid,
        "package": "com.mangoplate"
      },
      device_type_obj = get_device_os_type(),
      visited = (new Date()).getTime(),
      alreadyMoved = false;

  if (device_type_obj.androidChromeIntent) {
    // 안드로이드 크롬에서는 intent 만 동작하는 경우 처리.
    var intentUrl = "intent:" + service_info.scheme_url + "#Intent;package=" + service_info.package + ";end;";

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
  } else {
    window.location.href = service_info.scheme_url;
  }

  document.body.appendChild(iframe);

  // 뒤로가기 호출시 캐싱될 수도 있으므로 iframe을 삭제 한다.
  document.body.removeChild(iframe);
}

/**
 * 안드로이드 인지 아닌지 체크하는 함수.
 * @returns {boolean} - true : 안드로이드, false : 다른 OS
 * @private
 */
function _isAndroid() {
  var ua = navigator.userAgent.toLowerCase();

  return ua.indexOf("android") > -1;
}

/**
 * IOS 인지 아닌지 확인하는 메서드.
 * @returns {boolean} - true : IOS, false : 다른 OS
 * @private
 */
function _isIOS() {
  var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ],
      result = false;

  while (iDevices.length) {
    if (navigator.platform === iDevices.pop()) {
      result = true;
    }
  }

  return result;
}

function scroll_lock(not_fixed) {
  var css_property = {"overflow": "hidden"};

  if (is_mobile_viewport() && !not_fixed) {
    css_property['position'] = 'fixed';
  }

  $("body").css(css_property);
}

function unscroll_lock() {
  var css_property = {"overflow": "visible"};

  if (is_mobile_viewport()) {
    css_property['position'] = 'static';
  }

  $("body").css(css_property);
}

function scroll_toggle() {
  var now_overflow = $("body").css("overflow");

  if (now_overflow == "hidden") {
    unscroll_lock();
  } else {
    scroll_lock();
  }
}

function visible_black_screen() {
  $(".black_screen").fadeToggle();
}

function go_to_market(location, event) {
  if (event) {
    event.stopPropagation();
  }

  var iframe = document.createElement('iframe'),
      market_url_arr = {
        "android": "market://details?id=com.mangoplate",
        "ios": "https://itunes.apple.com/app/id628509224"
      };

  iframe.style.display = 'none';

  if (_isAndroid()) {
    var android_call_url;

    android_call_url = market_url_arr.android;
    window.location.href = android_call_url;

  } else if (_isIOS()) {
    window.location.href = market_url_arr.ios;
  } else {
    window.location.href = market_url_arr.android;
  }
}

function get_segment(index) {
  var pathname = window.location.pathname,
      pathname_arr = pathname.split("/");
  if (pathname_arr.length > 1) {
    pathname_arr = pathname_arr.slice(1, pathname.length);
  }
  if (index || index > -1) {
    return pathname_arr[index];
  } else {
    return pathname_arr;
  }
}

function scroll_event_able() {
  var $body = $("body"),
      check_events = $._data($body[0], "events"),
      event_array = ["touchmove", "scroll", "mousewheel"];

  $body.unbind(event_array.join(" "));
}

function scroll_event_disalbe() {
  var $body = $("body"),
      check_events = $._data($body[0], "events"),
      event_array = ["touchmove", "scroll", "mousewheel"];

  $body.on(event_array.join(" "), function(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
  });
}

function check_safari() {
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    return /safari/.test(navigator.userAgent.toLocaleLowerCase()) && !/crios/.test(navigator.userAgent.toLocaleLowerCase());
  } else {
    return /safari/.test(navigator.userAgent.toLocaleLowerCase());
  }
}

function referrer_params(exclude_param_arr) {
  exclude_param_arr = exclude_param_arr || [];

  var a_tag = document.createElement("a"),
      referrer_param_arr,
      referrer_param_str_prefix = "?",
      referrer_param_str;

  a_tag.href = document.referrer;

  referrer_param_str = a_tag.search.replace("?", "");
  referrer_param_arr = referrer_param_str.split("&");

  referrer_param_arr.forEach(function(item) {
    var temp_arr = item.split("=");

    if (exclude_param_arr.indexOf(temp_arr[0]) > -1) {
      referrer_param_arr = _.without(referrer_param_arr, temp_arr.join("="));
    }
  });

  referrer_param_str = referrer_param_str_prefix + referrer_param_arr.join("&");

  return referrer_param_str;
}

function get_utm_string(target) {
  var $target = target ? $(target) : {data: function(){}};
  var origin_param = "?utm_source=organic&utm_medium=organic&utm_campaign=organic";
  var utm_param;
  var utm_term;

  if (window.location.search.indexOf("utm_source") > -1) {
    utm_param = window.location.search;
  } else {
    if (document.referrer.indexOf("utm_source") > -1) {
      utm_param = referrer_params(["keyword", "page"]);
    } else {
      utm_param = origin_param;
    }
  }

  if (is_naver_app()) {
    utm_term = "NAVER_APP";
    trackEvent(utm_term);
  } else {
    utm_term = $target.data('event_term') || "organic";
  }

  utm_param = utm_param + '&utm_content=' + ($target.data('event_name') || "organic") + '&utm_term=' + utm_term;

  if (utm_param.indexOf("mangoplate.com") == -1) {
    utm_param = "&referrer=" + encodeURIComponent(utm_param.replace('?', '&'));
  }

  return utm_param;
}

function go_to_app_or_market(target, device_os) {
  var OS_STRING = {
    "IOS": "ios",
    "ANDROID": "android"
  };
  var utm_param;
  var link_promise;
  var store_link;

  if(!is_mobile_viewport()){
    var locale;
    var host_url = "https://www.mangoplate.com";

    if(OS_STRING.ANDROID === device_os){
      store_link = "https://play.google.com/store/apps/details?id=com.mangoplate";
    } else if(OS_STRING.IOS === device_os){
      store_link = "https://itunes.apple.com/kr/app/id628509224";
    } else {
      locale = get_locale();

      if(locale === "ko") {
        store_link = host_url;
      } else {
        store_link = host_url + "/" + locale;
      }
    }

    window.open(store_link);
    return false;
  } else {
    if(OS_STRING.ANDROID === device_os && _isIOS()){
      return false;
    } else if(OS_STRING.IOS === device_os && _isAndroid()){
      return false;
    }
  }

  utm_param = get_utm_string(target);
  window.mp20.branch_io_service.init();
  link_promise = window.mp20.branch_io_service.make_link(utm_param);

  link_promise.then(function(link) {

  });
}

function get_default_language() {
  return "kor";
}

function get_language() {
  var locale_and_language_map = {"ko": "kor", "en": "eng", "zh": "zho"};
  var locale = I18n.currentLocale();

  if(locale_and_language_map[locale]){
    return locale_and_language_map[locale];
  } else {
    return get_default_language();
  }
}

function get_locale() {
  return I18n.currentLocale();
}

function get_locale_url(url) {
  var isFullURL = url.indexOf('http://') > -1 || url.indexOf('https://') > -1;

  if (isFullURL) {
    return url;
  }

  if(I18n.defaultLocale === I18n.currentLocale()){
    return url
  } else {
    return "/" + I18n.currentLocale() + url;
  }
}

function get_device_type() {
  return "web";
}

function get_device_uuid() {
  var device_uuid_name = "mp_device_uuid";

  return getCookie(device_uuid_name);
}

function toggle_menu_layer() {
  if (window.mp20.push_status_server) {
    window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_open_action("menu"));
  } else {
    toggle_menu_layer_logic();
  }
}

function toggle_menu_layer_logic() {
  var $menu_module = $(".menu_module");

  if ($menu_module.css("display") === "none") {
    $menu_module.fadeIn("fast");
    //scroll_event_disalbe();
  } else {
    $menu_module.fadeOut("fast");
    //scroll_event_able();
  }
}

function close_menu_layer(callback) {
  if (window.mp20.push_status_server) {
    window.history.back();

    if (typeof callback === "function") {
      callback();
    }

    //window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_close_action("menu"));
  } else {
    var $menu_module = $(".menu_module");

    $menu_module.fadeOut("fast");
  }
  //var $menu_module = $(".menu_module");
  //
  //$menu_module.hide();
  //scroll_event_able();
}

function trim(str) {
  if (str) {
    str = str.toString();
    return str.replace(/ /g, '');
  } else {
    return str;
  }
}

function replaceAll(str, replace_str, target_str) {
  return str.split(replace_str).join(target_str);
}

function number_comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function mp20_stop_scroll() {
  var $body = $('body');

  $body.addClass('stop-scrolling');
  $body.bind('touchmove scroll', function(e) {
    e.preventDefault()
  });
}

function mp20_start_scroll() {
  var $body = $('body');

  $body.removeClass('stop-scrolling');
  $body.unbind('touchmove');
}

function is_mobile_viewport() {
  var client_width = document.documentElement.clientWidth;

  return (320 <= client_width) && (client_width < 769);
};

function img_error(element, src) {
  element.onerror = "";
  element.src = src;
  return true;
}

function is_mobile_device() {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// GA
/** @deprecated */
function get_common_ga_page_name(pg_name) {
  var is_app_param = "is_app";

  if (is_mobile_viewport()) {
    if (getParameter(is_app_param)) {
      pg_name = pg_name + "_APP";
    } else {
      pg_name = pg_name + "_MOBILE";
    }
  }
  return pg_name;
}
/** @deprecated */
function common_ga(pg_name, event_name, event_label, evnet_value) {
  if (!pg_name) {
    pg_name = get_now_page_code();
  }

  pg_name = get_common_ga_page_name(pg_name);

  if(_.isNumber(event_label)){
    event_label = event_label.toString()
  }

  if (_.isObject(event_label)) {
    try {
      event_label = JSON.stringify(event_label)
    } catch (e) {
      event_label = undefined;
    }
  }

  ga('send', 'event', pg_name, event_name, event_label, evnet_value);
};
/** @deprecated */
function common_ga_page(pg_name) {
  pg_name = get_common_ga_page_name(pg_name);

  ga('send', 'pageview', pg_name);
}
////////////////////////////////////////////////////////////////////////////////////////////////

function get_image_size(name) {
  var image_size = {
    "small": "/256x256/",
    "normal": "/512x512/",
    "big": "/1024x1024/"
  };

  return image_size[name];
}

function get_recommand_class_and_message(action_value) {
  var recommend_list = [
    {
      "class_name": "bad",
      "msg": "별로"
    },
    {
      "class_name": "ok",
      "msg": "괜찮다"
    },
    {
      "class_name": "good",
      "msg": "맛있다"
    }
  ];

  return recommend_list[action_value];
}

function get_wannago_text(action_class) {
  return action_class === "not_wannago_btn"
    ? I18n.t("menu_name.mn_visited")
    : I18n.t("menu_name.mn_wannago");
}

function get_time_diff_date(target_date) {
  var today = new Date(),
      dateArray = target_date.split("-"),
      dateObj = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);

  return parseInt((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60 / 24);
}

function get_common_params() {
  var common_param = {
    "language": getLanguage(),
    "device_uuid": get_device_uuid(),
    "device_type": get_device_type()
  };

  return common_param;
}

function get_region_text(common_code, region_code) {
  var type_name = "region_code";

  return get_commoncode_by_display_text(common_code, type_name, region_code);
}

/**
 * metro display_text를 가져오는 메서드.
 * @param common_code - commoncode_array
 * @param metro_code - metro code
 * @returns {string || undefined}
 */
function get_metro(common_code, metro_code) {
  var type_name = "metro_code";

  return get_commoncode_by_display_text(common_code, type_name, metro_code);
}

/**
 * sub_cuisine_code display_text를 가져오는 메서드.
 * @param common_code - commoncode_array
 * @param sub_cuisine_code - sub_cuisine_code
 * @returns {string} - cuisine code text
 */
function get_subcuisine(common_code, sub_cuisine_code) {
  var type_name = "subcusine_code";

  return get_commoncode_by_display_text(common_code, type_name, sub_cuisine_code);
}

/**
 * price code text를 가져오는 메서드.
 * @param common_code - common_code array
 * @param price_code - price_code
 * @returns {string} - price code text
 */
function get_price(common_code, price_code) {
  var type_name = "price_range_code";

  return get_commoncode_by_display_text(common_code, type_name, price_code);
}

/**
 * parking code text를 가져오는 메서드.
 * @param common_code - common code array
 * @param parking_code - parking code
 * @returns {string|undefined} - parking code text
 */
function get_parking(common_code, parking_code) {
  var type_name = "parking_option_code";

  return get_commoncode_by_display_text(common_code, type_name, parking_code);
}
/**
 * commoncode에서 display_text를 가져오는 메서드.
 * @param common_code - common_code Array
 * @param type_name - commoncode typeName
 * @param type_value - commoncode typeValue
 * @returns {string || undefined}
 */
function get_commoncode_by_display_text(common_code, type_name, type_value) {
  var metro_arr = _.where(common_code, {"type_name": type_name, "type_value": type_value}),
      metro_obj;

  metro_obj = metro_arr.length ? metro_arr[0] : {};

  return metro_obj.display_text || "";
}

function scroll_lock_for_gallery() {
  $("body").css("overflow", "hidden").css("position", "fixed");
}

function is_scroll_status() {
  var $body = $("body");

  return $body.css("overflow") === "hidden" && $body.css("position") === "fixed";
}

function unscroll_lock_for_gallery() {
  $("body").css("overflow", "visible").css("position", "static");
}

function get_ab_test_message(target, data_name, var_param) {
  var $target,
      return_data,
      type_str;

  if (target instanceof Event) {
    $target = $(target.currentTarget);
  } else {
    if (!(target instanceof $)) {
      $target = $(target);
    } else {
      $target = target;
    }
  }

  switch (var_param) {
    case 0:
      type_str = "_a";
      return_data = $target.data(data_name + type_str);
      break;
    case 1:
      type_str = "_b";
      return_data = $target.data(data_name + type_str);
      break;
  }

  return return_data;
}

function excute_ab_test_script(ab_script_array) {
  var var_params = getParameter("var");

  ab_script_array[parseInt(var_params ? var_params : 0)]();
}

function get_now_page_code() {
  var now_segment = get_segment(0),
      now_page_code,
      change_rule = {
        "SEARCH": "SEARCH_RESULT",
        "RESTAURANTS": "RESTAURANT",
        "TOP_LISTS": "TOP_LIST",
      };

  if (now_segment) {
    now_page_code = replaceAll(now_segment, "_", "");
    now_page_code = now_page_code.toUpperCase();
    now_page_code = change_rule[now_page_code] ? change_rule[now_page_code] : now_page_code;
  } else {
    now_page_code = "MAIN";
  }

  return "PG_" + now_page_code;
}

function reverse_str(str) {
  return str.split("").reverse().join("");
}

function insert_array_between(insert_index, plus_number, list, insert_data) {
  var one_more_index,
      origin_insert_index = insert_index,
      plus_number = plus_number || 0;

  _.each(list, function(item, index) {
    one_more_index = index + 1;

    if (!(one_more_index % insert_index)) {
      list.splice(index, 0, insert_data);
    }

    insert_index = insert_index + origin_insert_index + plus_number;
  });

  return list;
}

function get_between_number_arr(base_number, up_number, max_number) {
  var result_arr = [],
      now_number = base_number + up_number;

  for (; now_number < max_number; now_number = now_number + base_number + up_number) {
    result_arr.push(now_number);
  }

  return result_arr;
}

function get_og_meta_data() {
  var $meta = $("meta"),
      meta_content,
      meta_property,
      og_meta_list = [],
      $item;

  _.each($meta, function(item) {
    $item = $(item);
    meta_property = $item.attr("property");

    if (meta_property && meta_property.indexOf("og:") > -1) {
      meta_content = $item.attr("content");
      og_meta_list.push({
        "name": meta_property,
        "value": meta_content
      });
    }
  });

  return og_meta_list;
}

function convertUTCDateToLocalDate(date) {
  date = new Date(date);

  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate.toLocaleString();
}

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + '?' + pars.join('&');
    return url;
  } else {
    return url;
  }
}

function hangul_Josa_generator(txt, josa) {
  var code = txt.charCodeAt(txt.length - 1) - 44032;
  var cho = 19, jung = 21, jong = 28;
  var i1, i2, code1, code2;

  // 원본 문구가 없을때는 빈 문자열 반환
  if (txt.length == 0) return '';

  // 한글이 아닐때
  if (code < 0 || code > 11171) return txt;

  if (code % 28 == 0) return txt + Josa.get(josa, false);
  else return txt + Josa.get(josa, true);
}

hangul_Josa_generator.get = function(josa, jong) {
  // jong : true면 받침있음, false면 받침없음

  if (josa == '을' || josa == '를') return (jong ? '을' : '를');
  if (josa == '이' || josa == '가') return (jong ? '이' : '가');
  if (josa == '은' || josa == '는') return (jong ? '은' : '는');
  if (josa == '와' || josa == '과') return (jong ? '와' : '과');

  // 알 수 없는 조사
  return '';
};

function is_naver_app() {
  return navigator.userAgent.indexOf('NAVER(inapp') > -1;
}

function is_kakao_app() {
  return navigator.userAgent.indexOf('KAKAOTALK') > -1;
}

function to_safe_keyword(keyword) {
  keyword = replaceAll(keyword, ".", "");
  keyword = removeSpecialChar(keyword);
  return replaceAll(keyword, "/", "");
}

function go_to_search_page(keyword) {
  if (!keyword || keyword === "undefined") {
    alert(I18n.t('label.enter_the_keyword'));
    return false;
  }

  location.href = get_locale_url("/search/" + encodeURIComponent(to_safe_keyword(keyword)));
}

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

function chunk(chunkSize, array) {
  return _.reduce(array, function(previous, current) {
    var chunk;
    if (previous.length === 0 ||
        previous[previous.length - 1].length === chunkSize) {
      chunk = [];   // 1
      previous.push(chunk);   // 2
    }
    else {
      chunk = previous[previous.length - 1];   // 3
    }
    chunk.push(current);   // 4
    return previous;   // 5
  }, []);   // 6
}

function get_picture_url_by_akamai(pic_domain, pic_key, width, height, ext) {
  if (!pic_domain || !pic_key) {
    return 'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80';
  }
  var picture_url = pic_domain + "/" + pic_key;

  width = width || "*"
  height = height || "*"
  ext = ext || "jpg"

  var akamai_qs = _.template("?fit=around|{{width}}:{{height}}&crop={{width}}:{{height}};*,*&output-format={{ext}}&output-quality=80")

  akamai_qs = akamai_qs({
    width: width,
    height: height,
    ext: ext
  })

  picture_url += akamai_qs

  return picture_url;
}

function get_full_picture_url_by_akamai(picture_url, width, height, ext) {
  width = width || "*"
  height = height || "*"
  ext = ext || "jpg"

  var akamai_qs = _.template("?fit=around|{{width}}:{{height}}&crop={{width}}:{{height}};*,*&output-format={{ext}}&output-quality=80")

  akamai_qs = akamai_qs({
    width: width,
    height: height,
    ext: ext
  })

  picture_url += akamai_qs

  return picture_url;
}

function nameSpace(namespace) {
  var nsparts = namespace.split(".");
  var parent = window

  for (var i = 0; i < nsparts.length; i++) {
    var partname = nsparts[i];

    if (typeof parent[partname] === "undefined") {
      parent[partname] = {};
    }

    parent = parent[partname];
  }

  return parent;
}

function get_rating(rating) {
  if (!rating || !parseFloat(rating)) {
    return "";
  } else {
    return parseFloat(rating).toFixed(1);
  }
}

function get_expected_rating_class(is_official_rating) {
  return is_official_rating ? "" : "expected"
}

/**
 * Image의 onerror에 바인딩 해주는 메서드
 * 바인딩 할때 bind(this)로 this 바인드도 해줘야 한다
 */
function image_on_error(){
  this.src='https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80'
}

function is_foreign_restaurant(region_code){
  return region_code >= 100
}

function get_facebook_user_picture(user){
  var facebook_id = user.facebook_id;
  var picture_url = user.picture_url;

  if(facebook_id && picture_url === ""){
    return "https://graph.facebook.com/" + facebook_id + "/picture?type=large&w‌​idth=128&height=128";
  } else {
    if (picture_url) {
      return get_full_picture_url_by_akamai(picture_url, mp20.constants.DEFAULT_IMAGE_SIZE.USER_PROFILE, mp20.constants.DEFAULT_IMAGE_SIZE.USER_PROFILE);
    } else {
      return mp20.constants.USER_FALLBACK_IMAGE_URL;
    }
  }
}

function get_user_picture_url_by_akamai(picture_url, facebook_id, width, height) {
  if(facebook_id && picture_url) {
    return get_facebook_user_picture({
      facebook_id: facebook_id,
      picture_url: picture_url
    });
  } else {
    return get_full_picture_url_by_akamai(picture_url, width, height);
  }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function detectIE11() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // other browser
  return false;
}


function get_page_segment() {
  var locale_map_str = '{"ko":"kor","en":"eng","zh":"zho"}';
  var locale_map = JSON.parse(locale_map_str);
  var locale_list = _.keys(locale_map);
  var segment = get_segment(0);

  if (locale_list.indexOf(segment) > -1){
    return get_segment(1);
  }

  return segment;
}

function get_search_keyword() {
  var locale_map_str = '{"ko":"kor","en":"eng","zh":"zho"}';
  var locale_map = JSON.parse(locale_map_str);
  var locale_list = _.keys(locale_map);
  var segment = get_segment(0);

  if (locale_list.indexOf(segment) > -1){
    return get_segment(2);
  }

  return get_segment(1);
}

function get_display_platform() {
  return is_mobile_viewport() ? "Web_Mobile" : "Web_Desktop";
}

function is_firefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function safe_json_parse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

function isJqueryInstance(instance) {
  return instance instanceof $;
}

function parse_json(str, default_value) {
  try {
    return JSON.parse(str);
  } catch(e) {
    return default_value;
  }
}

function findEl(selector) {
  return document.querySelector(selector);
}

function stringPXToNumber(str) {
  return parseInt(str.slice(0, str.length - 2), 10);
}

function moveArrayItem(array, fromIndex, toIndex) {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);

  return array;
}

function is(instnace, klass) {
  return instnace instanceof klass;
}

function fileToBase64Encode(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result)
    };

    reader.onerror = function (error) {
      reject(error)
    };
  });
}

function throwOverrideMethodError(methodName) {
  throw new Error(methodName + ' is must override method');
}

function replaceAllLineBreakString(str, lineBreakString) {
  str = str || '';
  lineBreakString = lineBreakString || '<br/>';
  return str.replace(/(?:\r\n|\r|\n)/g, lineBreakString);
}

function removeSpecialChar(str) {
  var temp = str || '';
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  if(regExp.test(temp)){
    temp = temp.replace(regExp, '');
  }
  return temp;
}

function escapeString(text) {
  var result = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return result;
}

function encodeReviewKey(actionValue) {
  return btoa(actionValue);
}

function decodeReviewKey(reviewKey) {
  return atob(reviewKey);
}
;
(function () {
  var CONSTANTS = (function () {
    var constants = {
      "SLACK_WEB_HOOK_URL": "https://hooks.slack.com/services/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",
      "COOKIE_NAME_ENABLED": "debug_impression"
    };

    return {
      get: function (name) {
        return _.clone(constants[name]);
      }
    };
  })();

  var AdImpressionNotifier = {
    send_message: function (line_item_id, ad_unit_path) {
      if ($.cookie(CONSTANTS.get('COOKIE_NAME_ENABLED')) !== '1') {
        return;
      }

      var log_text = "Line Item ID: " + line_item_id + "\nAD Unit Path: " + ad_unit_path;

      $.ajax(CONSTANTS.get("SLACK_WEB_HOOK_URL"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "payload=" + encodeURIComponent(JSON.stringify({
          channel: "#web",
          username: "[WEB] DFP Impression Log",
          icon_emoji: ":kissing_heart:",
          attachments: [
            {
              "fallback": log_text,
              "title": "IMPRESSION",
              "text": log_text,
              "color": "#7CD197"
            }
          ]
        }))
      });
    },

    toggle: function() {
      var cookie_key = CONSTANTS.get('COOKIE_NAME_ENABLED');

      if($.cookie(cookie_key)) {
        $.removeCookie(cookie_key);
        alert("설정이 해제되었습니다.");
      } else {
        $.cookie(cookie_key, true);
        alert("설정이 완료되었습니다.");
      }
    }
  };

  window.AdImpressionNotifier = AdImpressionNotifier;
})();
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
!function(){"use strict";function a(){this.defaults={scrollButtons:{enable:!0},axis:"yx"},$.mCustomScrollbar.defaults.scrollButtons=this.defaults.scrollButtons,$.mCustomScrollbar.defaults.axis=this.defaults.axis,this.$get=function(){return{defaults:this.defaults}}}function b(a,b,c,d){c.mCustomScrollbar("destroy");var e={};d.ngScrollbarsConfig&&(e=d.ngScrollbarsConfig);for(var f in a)if(a.hasOwnProperty(f))switch(f){case"scrollButtons":e.hasOwnProperty(f)||(b.scrollButtons=a[f]);break;case"axis":e.hasOwnProperty(f)||(b.axis=a[f]);break;default:e.hasOwnProperty(f)||(e[f]=a[f])}c.mCustomScrollbar(e)}function c(a){return{scope:{ngScrollbarsConfig:"=?",ngScrollbarsUpdate:"=?",element:"=?"},link:function(c,d,e){c.elem=d;var f=a.defaults,g=$.mCustomScrollbar.defaults;c.ngScrollbarsUpdate=function(){d.mCustomScrollbar.apply(d,arguments)},c.$watch("ngScrollbarsConfig",function(a,e){void 0!==a&&b(f,g,d,c)}),b(f,g,d,c)}}}angular.module("ngScrollbars",[]).provider("ScrollBars",a).directive("ngScrollbars",c),a.$inject=[],c.$inject=["ScrollBars"]}();
(function () {
  var Coordinate = function (lat, lon) {
    this._lat = lat || 0;
    this._lon = lon || 0;
  };

  Coordinate.prototype = {
    get lat() {
      return this._lat;
    },

    get lon() {
      return this._lon;
    },

    toString: function () {
      return '(' + this.lat + ', ' + this.lon + ')';
    }
  };

  window.Coordinate = Coordinate;
})();
(function () {
  /**
   * page_history_service 네임 스페이스.
   * @type {Object}
   */
  var page_history_service = {};

  /**
   * page_history_service에서 사용할 각종 옵션 및 설정 사항.
   * @type {Object}
   */
  page_history_service.options = {
    "key": "mp_page_history",
    "target_element": $("body"),
    "max_count": 10
  };

  /**
   * localStorage에서 page history를 가져옴.
   * @return {Object || undefined}
   */
  page_history_service.get_page_history_from_localStorage = function () {
    return localStorage.getItem(this.options.key);
  };

  /**
   * localStorage에서 page history를 가져와서 JSON, 없으면 Array로 만들어 주는 메서드.
   * @return {JSON || Array}
   */
  page_history_service.get_page_history = function () {
    var page_history_str = this.get_page_history_from_localStorage(),
      page_history;

    if (page_history_str) {
      page_history = JSON.parse(page_history_str);
    } else {
      page_history = [];
    }

    return page_history;
  };

  /**
   * 데이터 저장시의 사용하는 구조를 만들어서 리턴해주는 메서드.
   * @param  {String} page_type [페이지 타입을 받음(get_segment(0))]
   * @param  {String} value     [페이지 값을 받음(get_segment(1))]
   * @return {Object}           [사용하는 구조로 리턴]
   */
  page_history_service.make_data_format = function (page_type, value) {
    return {
      "page_type": page_type,
      "value": value
    };
  };

  /**
   * localStorage에서 page history를 저장 하는 메서드.
   * 같은 값이 있으면 저장 하지 않고 없으면 저장.
   * @param  {String} restaurant_key [restaurant_key를 받음.]
   */
  page_history_service.set_page_history = function (restaurant_key) {
    var page_history = this.get_page_history();

    var temp_data = this.make_data_format("restaurants", restaurant_key);
    var is_same = _.where(page_history, temp_data);

    if (is_same.length) {
      page_history = this.remove_page_history(restaurant_key);
    }

    temp_data.visited_time = new Date();

    if (page_history.length >= this.options.max_count) {
      page_history = page_history.slice(1, page_history.length);
    }

    page_history.push(temp_data);
    localStorage.setItem(this.options.key, JSON.stringify(page_history));

  };

  /**
   *
   * @param restaurant_key
   */
  page_history_service.remove_page_history = function (restaurant_key) {
    var page_history = this.get_page_history(),
      remove_data = _.reject(page_history, function (data) {
        return data.value === restaurant_key;
      });

    localStorage.setItem(this.options.key, JSON.stringify(remove_data));

    return remove_data;
  };

  page_history_service.remove_all = function () {
    localStorage.setItem(this.options.key, "");
    this.update_count();
  };

  page_history_service.update_count = function (count) {
    var page_history_list = this.get_page_history();
    var page_history_count = page_history_list.length

    $(".user .count").html(page_history_count);
    $(".recent_view_counter").html(page_history_count);
  }


  //window 객체에 넣어줌.
  window.page_history_service = page_history_service;
})();
(function () {
  var auth_service = {};
  var $dom = {};

  $dom.init = function () {
    this.mp_login_btn = $(".mp_login_btn");
    this.mp_mine_btn = $(".mp_mine_btn");
    this.mp_mine_btn_none = $(".mp_mine_btn_none");
    this.wannago_btn = $(".wannago_btn");
    this.user_picture = $(".user_picture");
    this.user_name = $(".header .user .user_name");
    this.user_picture_btn = $(".header .user .is_login_status_btn .thumb");
    this.login_area = $(".login_loading_area");
  };

  $dom.init();
  auth_service.result_of_verify = null;
  auth_service.before_wannago = "before_wannago";
  auth_service.option = {
    "api_host": "https://stage.mangoplate.com",
    "api_subfix": ".js",
    "make_call_url": function (call_url, subfix) {
      var url_subfix = subfix || auth_service.option.api_subfix;
      return auth_service.option.api_host + call_url + url_subfix;
    },
    "save_auth_name": "mp_auth"
  };

  auth_service.is_auth = function () {
    return !!(auth_service.get_access_token());
  };

  auth_service.add_before_wannago = function () {
    var restaurantUUID = $.cookie(this.before_wannago);
    var dontWannagoActionTypes = [3, 4];
    if (!restaurantUUID) {
      return;
    }

    window.mp20.service.RestaurantSupplier.getRestaurant(restaurantUUID)
      .then(function (restaurant) {
        var isEmptyRestaurant = !restaurant;
        var isDontWannagoState = restaurant.action && dontWannagoActionTypes.indexOf(restaurant.action.action_type) > -1

        if (isEmptyRestaurant || isDontWannagoState) {
          throw new Error();
        }

        return mp20.wannago_http_service.wannago(restaurantUUID);
      })
      .then(function (wannago_info) {
        $(mp20.wannago_service.class_name + "[data-restaurant_uuid=" + restaurantUUID + "]").each(function (index, $el) {
          if (!wannago_info.error_code) {
            $(this).addClass(mp20.wannago_service.attr.selected_class);
            $(this).data(mp20.wannago_service.attr.action_id, wannago_info.action_id);
          }
        });

        auth_service.reset_before_wannago();
      })
      .catch(function () {

      });
  };

  auth_service.set_before_wannago = function (restaurant_uuid) {
    $.cookie(this.before_wannago, restaurant_uuid);
  };

  auth_service.reset_before_wannago = function () {
    $.removeCookie(this.before_wannago);
  };

  auth_service.auth_token_verify = function () {
    if (!auth_service.result_of_verify) {
      auth_service.result_of_verify = new Promise(function (resolve) {
        if (!auth_service.is_auth()) {
          resolve();
          return;
        }

        resolve(window.mp20.utils.HttpApi.checkVerifiedAccessToken(auth_service.get_access_token())
          .then(function (info) {
            if (typeof info === "string") {
              return JSON.parse(info);
            }
            return info;
          })
          .then(function (info) {
            if (info.error) {
              throw info.error;
            }
            return info;
          })
          .then(function (info) {
            auth_service.set_auth_info(info);
          })
          .catch(function () {
            alert(I18n.t('label.session_expire'));
            auth_service.logout();
          }));
      })
    }
    return auth_service.result_of_verify;
  };

  auth_service.logout = function () {
    localStorage.removeItem(auth_service.option.save_auth_name);

    function setCookie(cName, cValue, cDay) {
      var expire = new Date();
      expire.setDate(expire.getDate() + cDay);
      cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
      if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
    }

    setCookie("mp_auth", "", -1);
    window.location.reload();
  };

  auth_service.get_auth_info_by_storage = function () {
    var data = localStorage.getItem(auth_service.option.save_auth_name);
    if (data) {
      return JSON.parse(data)
    }
    return null;
  }

  auth_service.get_auth_info = function () {
    return new Promise(function (resolve) {
      if (!auth_service.is_auth()) {
        resolve(null);
        return;
      }

      var auth_info = auth_service.get_auth_info_by_storage();
      if (auth_info) {
        resolve(auth_info);
        return;
      }

      var verified_user_info_promise = auth_service.auth_token_verify()
        .then(function () {
          return auth_service.get_auth_info_by_storage();
        })
      resolve(verified_user_info_promise);
    });
  };

  auth_service.set_auth_info = function (auth_info) {
    if (typeof auth_info === "string") {
      setCookie("mp_auth", JSON.parse(auth_info).access_token);
    } else {
      setCookie("mp_auth", auth_info.access_token);
      auth_info = JSON.stringify(auth_info)
    }
    localStorage.setItem(auth_service.option.save_auth_name, auth_info);
  };

  auth_service.set_history_count = function () {
    page_history_service.update_count();
  };

  auth_service.check_policy_agreements = function (auth_info) {
    var nedd_property = ["private_info", "user_contract"],
      policy_agreements = auth_info.policy_agreements,
      is_verify = true;

    if (policy_agreements) {
      _.each(nedd_property, function (property) {
        var result = policy_agreements[property];

        if (!result) {
          is_verify = false;
        }
      })
    } else {
      is_verify = false;
    }
    return is_verify;
  };

  auth_service.get_access_token = function () {
    return $.cookie("mp_auth");
  };

  auth_service.get_member_uuid = function () {
    var auth_info = auth_service.get_auth_info_by_storage();
    return auth_info ? auth_info.member_uuid : null;
  };

  auth_service.is_holic_user = function () {
    if (auth_service.is_auth()) {
      var auth_info = auth_service.get_auth_info_by_storage();
      if (auth_info && auth_info.user_info) {
        return auth_info.user_info.is_holic;
      }
    }
    return false;
  }

  auth_service.is_validated_access_token = function () {
    var access_token = auth_service.get_access_token();
    var auth_info = this.get_auth_info();
    if (!auth_info) {
      return false;
    }
    return access_token != undefined && auth_info.access_token === access_token;
  };

  auth_service.policy_agreements = function (member_uuid, access_token) {
    window.mp20.utils.HttpApi.policyAgreements(member_uuid, access_token, auth_service.policy_agreements_data)
      .then(function (data) {
        window.location.reload();
      });
  };

  auth_service.set_policy_agreements_data = function (data) {
    this.policy_agreements_data = data;
  };

  auth_service.show_login_loading_area = function () {
    $dom.login_area.show();
  };

  auth_service.hide_login_loading_area = function () {
    $dom.login_area.hide();
  };

  auth_service.filter_terms_agreements = function (terms_agreements) {
    return terms_agreements.filter(function (term) {
      var except_terms = ['location', 'marketing'];
      return !except_terms.includes(term.term.id);
    });
  }

  window.auth_service = auth_service;
})();
(function () {
  var FacebookSDK = (function () {
    var STATUS = {
      CONNECTED: 'connected',
      notAuthorized: 'not_authorized',
      unknown: 'unknown'
    };

    function initialize() {
      FB.init({
        appId: 476661545693695,
        xfbml: true,
        version: 'v6.0'
      });
    }

    function getLoginStatus() {
      return new Promise(function (resolve) {
        FB.getLoginStatus(resolve);
      });
    }

    function login(scope) {
      return new Promise(function (resolve) {
        FB.login(resolve, {
          scope: scope
        });
      })
    }

    function api(path) {
      return new Promise(function (resolve) {
        FB.api(path, resolve);
      })
    }

    initialize();

    return {
      STATUS: STATUS,
      getLoginStatus: getLoginStatus,
      login: login,
      api: api
    };
  })();

  var MPFacebookAuthenticator = (function () {
    var FACEBOOK_PERMISSION_SCOPE = 'email,user_birthday,user_friends';

    function FBLogin() {
      return FacebookSDK.login(FACEBOOK_PERMISSION_SCOPE)
        .then(function (loginRes) {
          var isConnected = loginRes.status === FacebookSDK.STATUS.CONNECTED;

          if (isConnected) {
            return loginRes.authResponse;
          } else {
            throw new Error();
          }
        });
    }

    function FBGetLoginStatus() {
      return FacebookSDK.getLoginStatus()
        .then(function (res) {
          var isConnected = res.status === FacebookSDK.STATUS.CONNECTED;

          if (isConnected) {
            return res.authResponse;
          } else {
            return FBLogin();
          }
        })
    }

    function getFirstStepByViewport() {
      if (is_mobile_viewport()) {
        return FBLogin();
      }

      return FBGetLoginStatus();
    }

    function shouldRedirectToHTTPS() {
      var uriManager = new window.mp20.service.URIManager();

      if (uriManager.isHTTPSURL()) {
        return false;
      }

      var isProductionSubDomain = uriManager.isProductionSubDomain();
      var isBetaSubDomain = uriManager.isBetaSubDomain();
      var isAlphaSubdomain = uriManager.isAlphaSubdomain();
      var isUnknownSubDomain = !(isProductionSubDomain || isBetaSubDomain || isAlphaSubdomain);

      if (isUnknownSubDomain) {
        return false;
      }

      uriManager.toHTTPS();
      if (uriManager.isProductionSubDomain()) {
        uriManager.setSubDomain(window.mp20.service.URIManager.PHASE_BY_SUB_DOMAIN.PRODUCTION);
      }

      alert(I18n.t('label.to_https_redirect'));
      uriManager.toRedirect();
      return true;
    }

    function signIn() {
      if (shouldRedirectToHTTPS()) {
        return;
      }

      auth_service.show_login_loading_area();

      getFirstStepByViewport()
        .then(function (authResponse) {
          return window.mp20.utils.HttpApi.signInByFacebook(authResponse.userID, authResponse.accessToken)
            .then(function (res) {
              if (res.error) {
                return signUp(authResponse);
              }
              return res;
            });
        })
        .then(function (res) {
          var termsAgreements = auth_service.filter_terms_agreements(res.terms_agreements);
          if (termsAgreements.length) {
            auth_service.hide_login_loading_area();
            window.account_terms_layer.open(res.user_info.member_uuid, termsAgreements, res);
          } else {
            auth_service.set_auth_info(res);
            window.location.reload();
          }
        })
        .catch(function (err) {
          if (err.message) {
            alert(err.message);
          }
          auth_service.hide_login_loading_area();
        });
    }

    function signUp(authInfo) {
      return FacebookSDK.api('/me?fields=birthday,email,first_name,last_name,locale')
        .then(function (userInfo) {
          return {
            userId: authInfo.userID,
            accessToken: authInfo.accessToken,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email: userInfo.email,
            locale: userInfo.locale,
            birthday: userInfo.birthday,
          };
        })
        .then(function (FBUserInfo) {
          return window.mp20.utils.HttpApi.signUpByFacebook(FBUserInfo);
        })
        .then(function (res) {
          if (res.error) {
            throw new Error("알 수 없는 오류가 발생하였습니다. 다시 시도해 주세요.");
          }

          return res;
        });
    }

    return {
      login: signIn
    }
  })();

  window.mp_facebook = MPFacebookAuthenticator;
})();
$(document).ready(function () {
  var mp_kakao = {};
  var constants = nameSpace("mp.module.constants");

  mp_kakao.option = {
    "loginSuccessCallback": function (authObj) {
      auth_service.show_login_loading_area();

      mp_kakao.auth_info = authObj;
      mp_kakao.get_me(mp_kakao.mp_login);
    },

    "loginFailCallback": function (err) {
      alert("카카오톡 로그인이 실패했습니다.");
    },

    "api_host": "https://stage.mangoplate.com",
    "api_subfix": ".json",
    "make_call_url": function (call_url) {
      return mp_kakao.option.api_host + call_url + mp_kakao.option.api_subfix;
    }
  };

  mp_kakao.mp_login = function (kakao_info) {
    var access_token = mp_kakao.auth_info.access_token;
    var kakao_id = kakao_info.id;
    var call_url = "/api/v5/account/login/by_kakao";

    $.ajax({
      "url": mp_kakao.option.make_call_url(call_url),
      "type": "post",
      "data": {
        "kakao_id": kakao_id,
        "kakao_access_token": access_token,
        "device_uuid": get_device_uuid(),
        "device_type": "web",
        "language": get_language()
      }
    }).done(function (auth_info) {
      if (auth_info.error) {
        var error_code = auth_info.error.error_code;
        if (error_code === window.mp20.constants.RESULT_CODE.MAINTENANCE_MODE) {
          window.location.reload();
          return;
        }
        mp_kakao.mp_join(kakao_info);
        return;
      }

      var terms_agreements = auth_service.filter_terms_agreements(auth_info.terms_agreements);
      if (terms_agreements.length) {
        auth_service.hide_login_loading_area();
        window.account_terms_layer.open(auth_info.user_info.member_uuid, terms_agreements, auth_info);
      } else {
        auth_service.set_auth_info(auth_info);
        window.location.reload();
      }
    });
  };

  mp_kakao.mp_join = function (kakao_info) {
    var self = this;
    var call_url = "/api/v5/account/signup/by_kakao";
    var email = kakao_info.kaccount_email ? kakao_info.kaccount_email : '';

    $.ajax({
      "url": self.option.make_call_url(call_url),
      "type": "post",
      "data": {
        "kakao_id": kakao_info.id,
        "kakao_access_token": mp_kakao.auth_info.access_token,
        "device_type": "web",
        "language": get_language(),
        "first_name": kakao_info.properties.nickname,
        "last_name": "",
        "email": email,
        "country": "",
        "picture_url": kakao_info.properties.thumbnail_image,
        "birthday": "",
        "gender": ""
      }
    }).done(function (auth_info) {
      if (auth_info.error) {
        alert("가입 실패.");
        return ;
      }
      var terms_agreements = auth_service.filter_terms_agreements(auth_info.terms_agreements);

      window.account_terms_layer.open(auth_info.user_info.member_uuid, terms_agreements, auth_info);
    })
  }

  mp_kakao.login = function (successCallback, fallCallback) {
    Kakao.Auth.login({
      success: mp_kakao.option.loginSuccessCallback,
      fail: mp_kakao.option.loginFailCallback,
      throughTalk: false
    });
  };

  mp_kakao.get_me = function (successCallback) {
    var options = {
      "url": "/v2/user/me",
      "success": successCallback
    };

    return Kakao.API.request(options);
  };

  mp_kakao.checkLoadKakao = function () {
    var result = false;

    if (window.Kakao) {
      result = true;
    }

    return result;
  }

  Kakao.init("c7a58d638097e8cc349f7700b267b64f");
  window.mp_kakao = mp_kakao;
});
$(document).ready(function () {
  window.mp_apple = (function () {
    function initialize() {
      AppleID.auth.init({
        clientId: 'com.mangoplate.www',
        scope: 'name email',
        redirectURI: 'https://' + window.location.hostname + '/auth/confirm_login/apple',
        usePopup: true
      });
    }

    initialize();

    function shouldRedirectToHTTPS() {
      var uriManager = new window.mp20.service.URIManager();

      if (uriManager.isHTTPSURL()) {
        return false;
      }

      if (!uriManager.isTargetHostDomain()) {
        return false;
      }

      uriManager.toHTTPS();
      if (uriManager.isProductionSubDomain()) {
        uriManager.setSubDomain(window.mp20.service.URIManager.PHASE_BY_SUB_DOMAIN.PRODUCTION);
      }

      alert(I18n.t('label.to_https_redirect'));
      uriManager.toRedirect();
      return true;
    }

    function login() {
      if (detectIE11()) {
        alert(I18n.t('label.not_supported_browser'));
        return;
      }
      if (shouldRedirectToHTTPS()) {
        return;
      }
      AppleID.auth.signIn();
    }

    function parseIdToken(id_token) {
      try {
        return JSON.parse(atob(id_token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }

    return {
      login: login,
      parseIdToken: parseIdToken
    };
  })();

  document.addEventListener('AppleIDSignInOnSuccess', function (data) {
    var token = window.mp_apple.parseIdToken(data.detail.authorization.id_token);
    var aud = token.aud;
    var sub = token.sub;
    var email = token.email;
    var code = data.detail.authorization.code;
    var firstName = '';
    var lastName = '';
    if (data.detail.user) {
      firstName = data.detail.user.firstName;
      lastName = data.detail.user.lastName;
    }

    auth_service.show_login_loading_area();
    window.mp20.utils.HttpApi.startWithApple(aud, sub, code, email, firstName, lastName)
      .then(function (res) {
        if (res.error) {
          throw new Error(res.error.message);
        }
        var termsAgreements = auth_service.filter_terms_agreements(res.terms_agreements);
        if (termsAgreements.length) {
          auth_service.hide_login_loading_area();
          window.account_terms_layer.open(res.user_info.member_uuid, termsAgreements, res);
        } else {
          auth_service.set_auth_info(res);
          window.location.reload();
        }
      })
      .catch(function (err) {
        console.error(err);
        alert(I18n.t('error_meesage.default'));
        auth_service.hide_login_loading_area();
      });
  });

});

(function(){
    $(document).ready(function(){
        var $dom = {};
        var constants = nameSpace("mp.module.constants");
        var true_str = "true",
            false_str = "false",
            false_btn_src = get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/24_jjq1lbdgzpdnp.png", undefined, undefined, "png"),
            true_btn_src = get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/ojlwsg-0cpi1dz8p.png", undefined, undefined, "png"),
            account_terms_layer = {},
            terms_title_map ={
              "privacy": I18n.t("terms.privacy"),
              "privacy_short": I18n.t("terms.privacy_short"),
              "contract": I18n.t("terms.contract")
            },
            has_click_class = "ischecked",
            terms_item_template;

        account_terms_layer.open = function(member_uuid, terms_list, auth_info){
            trackView("PG_AGREEMENT");

	          auth_service.hide_login_loading_area();
            mp_login_layer.close_layer();
            account_terms_layer.member_uuid = member_uuid;
            account_terms_layer.terms_list = terms_list;
            account_terms_layer.auth_info = auth_info;

            terms_list.forEach(function(terms_item) {
              terms_item = $.extend({}, terms_item, {
                title: I18n.t('login_popup.agree', {
                  title: terms_title_map[terms_item.term.id] || terms_item.term.title
                })
              });

              var $terms_item = $(account_terms_layer.build_terms_item_template(terms_item));

              if(terms_item.term.required === "required") {
                $terms_item.find('.required_message').show();
              }

              $dom.account_terms_items.append($terms_item);
            });

            $(".account_terms_layer").fadeIn('fast');
            scroll_lock();
        };

        account_terms_layer.build_terms_item_template = function(terms_data) {
          if (!terms_item_template) {
            terms_item_template = Handlebars.compile(account_terms_layer.get_terms_item_template_string());
          }

          return terms_item_template(terms_data);
        };

      account_terms_layer.get_terms_item_template_string = function () {
        return '<li class="account_terms_item">' +
          '        <p>' +
          '          <a href="' + get_locale_url('https://stage.mangoplate.com/api/terms/revisions/{{revisionID}}.html') + '" rel="nofollow" onclick="trackEvent(\'CLICK_TERMS\', \'{{ term.id }}\',\'\',\'PG_AGREEMENT\')" target="_blank" class="mango_color_under_bar">' +
          '            {{ title }}' +
          '          </a>' +
          '' +
          '          <span class="required_message">(' + I18n.t('login_popup.required') + ')</span>' +
          '        </p>' +
          '        <button class="check_terms_btn" data-ischecked="false" data-term-id="{{ term.id }}" data-revision-id="{{ revisionID }}">' +
          '          <img src="https://mp-seoul-image-production-s3.mangoplate.com/web/resources/24_jjq1lbdgzpdnp.png?fit=around|:&crop=:;*,*&output-format=png&output-quality=80"' +
          '               alt="arrow"' +
          '               title=""' +
          '          />' +
          '        </button>' +
          '      </li>';
      }

        account_terms_layer.close = function(){
            $(".account_terms_layer").fadeOut('fast');
            $dom.account_terms_items.find(".account_terms_item").remove();
            $dom.all_terms_btn.find("img").attr("src", false_btn_src);
            $dom.all_terms_btn.data(has_click_class, false_str);
            $dom.account_terms_layer_ok_btn.prop("disabled", true);
            unscroll_lock();
        };

        $dom.init = function(){
            this.check_terms_btn = $(".check_terms_btn");
            this.account_terms_layer_ok_btn = $(".account_terms_layer_ok_btn");
            this.all_terms_btn = $(".all_terms_btn");
            this.close_btn = $(".close_btn");
            this.account_terms_layer = $(".account_terms_layer");
            this.account_terms_items = $(".account_terms_items");
        };

        $dom.init();

        $dom.close_btn.on("click", function(){
            account_terms_layer.close();
        });

        $dom.account_terms_items.on("click", ".check_terms_btn", function(e){
            if($(this).hasClass("all_terms_btn")){
                return false;
            }

            var is_checked = $(this).data(has_click_class);

            if(is_checked === true_str){
                $(this).find("img").attr("src", false_btn_src);
                $(this).data(has_click_class, false_str);

            } else {
                $(this).find("img").attr("src", true_btn_src);
                $(this).data(has_click_class, true_str);
            }

            var true_count = 0,
                check_terms_btn_list = $(".account_terms_items .check_terms_btn");

            check_terms_btn_list.each(function(i, e){
                if($(this).data(has_click_class) == true_str){
                    true_count++;
                }
            });

            if(check_terms_btn_list.length == true_count){
                $dom.all_terms_btn.find("img").attr("src", true_btn_src);
                $dom.all_terms_btn.data(has_click_class, true_str);
            } else {
                $dom.all_terms_btn.find("img").attr("src", false_btn_src);
                $dom.all_terms_btn.data(has_click_class, false_str);
            }

            required_check(account_terms_layer.terms_list);
        });

        $dom.account_terms_layer_ok_btn.on("click", function(){
            var terms_list = account_terms_layer.terms_list;
            var term_el_list = terms_list.map(function(revisionItem) {
              return $(".check_terms_btn[data-term-id="+revisionItem.term.id+"]");
            });

            required_check(terms_list);

            var revisionIDs = term_el_list
              .map(function (revisionItem) {
                if (revisionItem.data("ischecked") === true_str) {
                  return revisionItem.data("revision-id");
                }
              }).filter(function (revisionItem) {
                if (typeof(revisionItem) !== "undefined") {
                  return revisionItem
                }
              });

            var check_terms_map = {};

            term_el_list.forEach(function(revisionItem) {
              var term_id = revisionItem.data('term-id');

              check_terms_map[term_id] = revisionItem.data("ischecked") === true_str;
            });

            trackEvent("CLICK_CONFIRM", JSON.stringify(check_terms_map), '', 'PG_AGREEMENT');

          window.mp20.utils.HttpApi.termsAgreements(account_terms_layer.auth_info.access_token, account_terms_layer.member_uuid, revisionIDs.join(","))
            .then(function (res) {
              if (res.error) {
                alert("가입 실패");
                return;
              }

              auth_service.set_auth_info(account_terms_layer.auth_info);
              location.reload();
            })
        });

        $dom.all_terms_btn.on("click", function(){
            var check_terms_btn = $(".check_terms_btn");
            if(String($(this).data("ischecked")) == false_str){
                check_terms_btn.data(has_click_class, true_str);
                check_terms_btn.find("img").attr("src", true_btn_src);
            } else {
                check_terms_btn.data(has_click_class, false_str);
                check_terms_btn.find("img").attr("src", false_btn_src);
            }

            required_check(account_terms_layer.terms_list);
        });

        function get_policy_agreements_data(){
            var policy_agreements_data = {};

            policy_agreements_data.user_contract = $(".user_contract_btn").data(has_click_class);
            policy_agreements_data.private_info = $(".private_info_btn").data(has_click_class);
            policy_agreements_data.location_info = $(".location_info_btn").data(has_click_class);
            policy_agreements_data.newsletter = "false"

            return policy_agreements_data;
        }

        function required_check(terms_list) {
            var count = 0;

            var requiredItemList = terms_list.filter(function(requiredItem) {
                return requiredItem.term.required === "required";
            }).map(function(requiredItem) {
                return $(".check_terms_btn[data-term-id="+requiredItem.term.id+"]");
            });

            $.each(requiredItemList, function(){
                if(String($(this).data(has_click_class)) == false_str){
                    return false;
                } else {
                    count++;
                }
            });

            if (count !== requiredItemList.length) {
                $dom.account_terms_layer_ok_btn.prop("disabled", true);
            } else {
                $dom.account_terms_layer_ok_btn.prop("disabled", false);
            }
        }

        window.account_terms_layer = account_terms_layer;
    });

    $(document).ready(function(){
        var touchstartClick = "touchstart click";
        var login_layer = {},
            $pg_login = $(".pg-login"),
            $facebook_login_btn = $pg_login.find(".btn-login.facebook"),
            $kakaotalk_login_btn = $pg_login.find(".btn-login.kakaotalk"),
            $apple_login_btn = $pg_login.find(".btn-login.apple"),
            $message = $pg_login.find(".message"),
            $closeBtnLogin = $(".close_btn_login");

        $facebook_login_btn.on("click", function eventCallback(e){
          e.preventDefault();
          mp_facebook.login();
        });

        $kakaotalk_login_btn.on("click", function eventCallback(e){
          e.preventDefault();
          mp_kakao.login();
        });

        $apple_login_btn.on("click", function eventCallback(e){
          e.preventDefault();
          mp_apple.login();
        });

        $pg_login.on(touchstartClick, function(e){
          e.stopPropagation();

          if($(e.target).hasClass("pg-login")){
            e.preventDefault();
            login_layer.close_layer();
          }
        });

        login_layer.open_layer = function (description) {
          description = description || I18n.t('login_popup.login_message');
	        trackView('PU_LOGIN');
	        login_layer._set_description(description);
          $pg_login.show();
        };

        login_layer._set_description = function (description) {
          $message.html(description);
        }

        login_layer.close_layer = function () {
          closeView('PU_LOGIN');
          $pg_login.hide();
        };

        login_layer.not_closed_mode = function () {
          $pg_login.off(touchstartClick);
          $('.btn-nav-close').hide();
        }

        $closeBtnLogin.on("click", function(){
          login_layer.close_layer();
        });

        window.mp_login_layer = login_layer;
    });
})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//




;
(function(){
    /**
     * UTM 파라미터를 gennerating 해주는 유틸 객체.
     * @namespace utm_manager
     */
    var utm_manager = {

        /**
         * utm을 위한 파라미터를 Generate해주는 메서드.
         * @param platform_name - 공유 혹은 사용하는 source 이름.
         * @param target_url - 해당 파라미터를 붙일 URL
         * @param for_web_param - utm_term, utm_content 같은 web에서만 사용하는 파라미터를 넣어줄때 사용하는 파라미터.
         */
        generate_url: function(platform_name, target_url, for_web_param){
            var utm_obj = this.get_data_form(),
                result,
                utm_param;

            utm_obj.utm_source = platform_name || "organic";
            utm_obj.utm_medium = this.get_medium(target_url);
            utm_obj.utm_campaign = this.get_campaign(target_url);

            if(typeof for_web_param === "object"){
                $.extend(utm_obj, for_web_param);
            }

            utm_param = $.param(utm_obj);

            if(target_url){
                var a_tag = document.createElement("a");
                var pathname;

                a_tag.href = target_url;
                pathname = a_tag.pathname;

                if(pathname[0] !== "/"){
                  pathname = "/" + pathname;
                }

                target_url = a_tag.protocol + "//" + a_tag.host + pathname + "?" + utm_param;
                result = target_url;
                result = this.filter_url(result);
            } else {
                result = utm_param;
            }

            return result;
        },

        /**
         * utm의 기본 객체를 반환하는 메서드.
         * @returns {{utm_source: string, utm_medium: string, utm_campaign: string, utm_term: string, utm_content:
         *     string}}
         */
        get_data_form: function(){
            return {
                "utm_source": "organic",
                "utm_medium": "organic",
                "utm_campaign": "organic",
                "utm_term": "v1",
                "utm_content": "organic"
            }
        },

        /**
         * utm_medium을 리턴하는 메서드.
         * @returns {string}
         */
        get_medium: function(target_url){
            var result;

            if(target_url){
                var a_tag = this.make_a_tag(target_url);

                result = this.get_a_tag_by_segment(a_tag, 0);
            } else {
                result = get_segment(0);
            }

            return result;
        },

        /**
         * utm_campaign을 리턴하는 메서드.
         * @returns {string}
         */
        get_campaign: function(target_url){
            var result;

            if(target_url){
                var a_tag = this.make_a_tag(target_url);

                result = this.get_a_tag_by_segment(a_tag, 1);
            } else {
                result = get_segment(1);
            }

            return result;
        },

        get_utm_param: function(){
            var utm_param = this.get_data_form();

            utm_param.utm_source = getParameter("utm_source");
            utm_param.utm_medium = this.get_medium();
            utm_param.utm_campaign = this.get_campaign();

            return $.param(utm_param);
        },

        make_a_tag: function(url){
            var a_tag = document.createElement("a");
            a_tag.href = url;

            return a_tag;
        },

        get_a_tag_by_segment: function(a_tag, index){
            var pathname = a_tag.pathname,
                pathname_arr = pathname.split("/"),
                segment;

            if(pathname_arr.length > 1){
                pathname_arr = pathname_arr.slice(1, pathname.length);
            }
            if(index || index > -1){
                segment = pathname_arr[index];
            } else {
                segment = pathname_arr;
            }

            return segment;
        },
        
        el_by_for_web_param: function($el){
            return {
                "utm_term": $el.data("term") || "organic",
                "utm_content": $el.data("content") || "organic"
            }
        },

        filter_url: function(url){
            if(url.indexOf("ad-min.mangoplate.com") > -1 || url.indexOf("admin.mangoplate.com") > -1){
                url = removeURLParameter(url, "utm_referrer");
                url = removeURLParameter(url, "referrer");
            }

            return url;
        }
    };
    //
    //utm_manager.platform = {};
    //
    //utm_manager.platform['KAKAO'] = function(){
    //
    //};
    //
    //utm_manager.platform['FACEBOOK'] = function(){
    //
    //};
    //
    //utm_manager.platform['TWITTER'] = function(){
    //
    //};
    //
    //utm_manager.platform['BAND'] = function(){
    //
    //};
    //
    //utm_manager.platform['MAIL'] = function(){
    //
    //};

    /**
     * 전역 네임스페이스에 바인딩.
     */
    if (window.mp20){
        window.mp20.utm_manager = utm_manager;
    } else {
        window.mp20 = {};
        window.mp20.utm_manager = utm_manager;
    }
})();
(function(){
	/**
	 * 네임스페이스 오브잭트.
	 * @namespace wannago_http_service
	 */
	var wannago_http_service = {};

	/**
	 * wannago 처리를 해주는 메서드.
	 * @param restaurant_uuid - wannago 해줄 식당의 uuid
	 * @returns {promise} - response를 담은 Promise 객체.
	 */
	wannago_http_service.wannago = function(restaurant_uuid){
	  return window.mp20.utils.HttpApi.wannago(restaurant_uuid);
	};

	/**
   * wannago를 cancel 처리 해주는 메서드.
	 * @param action_id - 캔슬할 wannago의 action_id
	 * @returns {promise} - response를 담은 Promise 객체.
	 */
	wannago_http_service.cancel_wannago = function(action_id){
    return window.mp20.utils.HttpApi.cancelWannago(action_id);
	};

	/**
	 * wannago 리스트를 가져오는 메서드.
	 * @param start_index - 가져오기 시작할 index
	 * @param request_count - 가져올 레코드 갯수.
	 * @returns {promise} - response를 담은 promise 객체.
	 */
	wannago_http_service.get_wannago_list = function(start_index, request_count){
    return auth_service.get_auth_info()
      .then(function (auth_info) {
        return window.mp20.utils.HttpApi.getWannagoRestaurants(auth_info.user_info.member_uuid, start_index, request_count)
      })
	};

	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		window.mp20.wannago_http_service = wannago_http_service;
	} else {
		window.mp20 = {};
		window.mp20.wannago_http_service = wannago_http_service;
	}
})();
(function(){
	/**
	 * Wannago 네임 스페이스
	 * @namespace wannago
	 */
	var wannago = {};

	wannago.list_request_count = 10;
	wannago.list_start_index = 0;
  wannago.SET_ACTION_TIMESTAMP_COOKIE_NAME = "mp_auth_last_action_timestamp";
  wannago.queue = {};

	/**
	 * wanngo 할때 사용하는 Attribute String 모음.
	 * @type {{action_id: string, restaurant_uuid: string, selected_class: string}}
	 */
	wannago.attr = {
		"action_id": "action_id",
		"restaurant_uuid": "restaurant_uuid",
		"selected_class": "selected",
		"not_wannago_btn_class": "not_wannago_btn"
	};

	wannago.action_type = {
	  wannago: 4,
    beenhere: 3,
  }

	wannago.action_types = [wannago.action_type.wannago, wannago.action_type.beenhere]

	/**
	 * wannago button의 class
	 * @type {string}
	 */
	wannago.class_name = ".wannago_btn";

  /**
   * 해당 id로 된 queue가 있는지 체크하는 메서드.
   * @param id
   * @return {boolean}
   */
	wannago.is_processing_id = function(id) {
	  return wannago.queue.hasOwnProperty(id);
  };

  /**
   * Wannago / cancel Wannago 작업을 하기전에 queue에 넣어주는 메서드.
   * @param id
   */
	wannago.process_start = function(id) {
	  if (wannago.queue[id]) {
	    return ;
    }

    wannago.queue[id] = true;
  };

  /**
   * wannago queue에서 해당 id를 지워주는 메서드.
   * @param id
   */
  wannago.process_end = function(id) {
    delete wannago.queue[id];
  }

	/**
	 * promise 처리를 공통으로 해주는 메서드.
	 * @param promise - 처리할 Promise
	 * @param success - 성공시 호출할 callback 함수.
	 */
	wannago.common_promise = function(promise, success){
		promise.then(success).catch(function(err){
			console.error(err);
		});
	};

	wannago.get_wannago_list = function(start_index, request_count){
		var list_wannago_promise = mp20.wannago_http_service.get_wannago_list(start_index, request_count);
		wannago.common_promise(list_wannago_promise, function success(wannago_list){
		});
	};

	wannago.get_wannago_count = function(){
		return $.cookie(this.attr.user_wannago_count) || 0;
	};

  wannago.set_wannago_btn = function (action, targetEl) {
    if (!action) {
      return;
    }
    var wannago_class = wannago.get_action_class(action);
    var $targetEl = $(targetEl);
    if ($targetEl.length) {
      $targetEl.addClass(wannago_class).data(wannago.attr.action_id, action.action_id);
      if (wannago_class === 'not_wannago_btn') {
        $targetEl.parent('.wannago_wrap').addClass('notPoint');
      }
    }
  }

	wannago.set_cookie_auth_last_action_timestamp = function(){
    var time_stamp = new Date().getTime();

    $.cookie(this.SET_ACTION_TIMESTAMP_COOKIE_NAME, time_stamp);
  };

	/**
	 * wannago button에 적용할 클레스를 리턴하는 메서드.
	 * @param action - action Object
	 * @returns {string} - 적용할 클레스.
	 */
	wannago.get_action_class = function(action){
		var return_class = "";
    if (action) {
			if(parseInt(action.action_type) === wannago.action_type.wannago){
				return_class = "selected";
			} else if (parseInt(action.action_type) === wannago.action_type.beenhere){
				return_class = "not_wannago_btn";
			}
		}

		return return_class;
	};

	wannago.map_wannago_sync = function(){

	};

	/**
	 * Wannago Button Class에 이벤트 바인딩.
	 */
	$(document).on("click", wannago.class_name, function (e) {
    e.preventDefault();
    e.stopPropagation();
    handleClickWannago($(e.currentTarget))
  });

  function handleClickWannago($wannago_btn) {
    var action_id = $wannago_btn.data(wannago.attr.action_id);
    var restaurant_uuid = $wannago_btn.data(wannago.attr.restaurant_uuid);
    var $same_wannago_btn_list;

    if ($wannago_btn.hasClass(wannago.attr.not_wannago_btn_class)) {
      return false;
    }

    if (!restaurant_uuid) {
      return;
    }

    if (!auth_service.is_auth()) {
      window.mp_login_layer.open_layer();
      auth_service.set_before_wannago(restaurant_uuid);
      return false;
    }

    if (wannago.is_processing_id(restaurant_uuid)) {
      return;
    }
    wannago.process_start(restaurant_uuid);

    $same_wannago_btn_list = $(wannago.class_name + "[data-restaurant_uuid=" + restaurant_uuid + "]");
    /**
     * action_id가 있으면 cacenl_wannago를 하고
     * action_id가 없으면 wannago를 한다.
     */
    if (trim(action_id)) {
      //가고싶다 취소 처리.
      trackEvent("CLICK_WANNAGO_OFF", JSON.stringify({restaurant_uuid:restaurant_uuid}));
      $same_wannago_btn_list.each(function () {
        $(this).removeClass(wannago.attr.selected_class);
      });
      var cancel_wannago_promise = mp20.wannago_http_service.cancel_wannago(action_id);
      cancel_wannago_promise.then(function (wannago_info) {
        $wannago_btn.data(wannago.attr.action_id, "");
        wannago.set_cookie_auth_last_action_timestamp();
        wannago.process_end(restaurant_uuid);
      }).catch(function (err) {
        window.location.reload();
        console.error(err);
      });
    } else {
      //가고싶다 처리.
      trackEvent("CLICK_WANNAGO_ON", JSON.stringify({restaurant_uuid:restaurant_uuid}));
      $same_wannago_btn_list.each(function () {
        $(this).addClass(wannago.attr.selected_class);
      });
      var wannago_promise = mp20.wannago_http_service.wannago(restaurant_uuid);
      wannago_promise.then(function (wannago_info) {
        $same_wannago_btn_list.each(function () {
          $(this).addClass(wannago.get_action_class(wannago_info));
        });
        $wannago_btn.data(wannago.attr.action_id, wannago_info.action_id);
        wannago.set_cookie_auth_last_action_timestamp();
        wannago.process_end(restaurant_uuid);
      }).catch(function (err) {
        window.location.reload();
        console.error(err);
      });
    }
  }

  if (auth_service.is_auth()) {
    auth_service.add_before_wannago();
  } else {
    auth_service.reset_before_wannago();
  }

	wannago.handleClickWannago = handleClickWannago;
	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		window.mp20.wannago_service = wannago;
	} else {
		window.mp20 = {};
		window.mp20.wannago_service = wannago;
	}
})();
(function(){
	/**
	 * Branch.Io 네임스페이스.
	 * @namespace
	 */
	var branch_io_service = {}, branch;

	branch_io_service.PAGE_KEY = {
		"TOP_LIST": "TOP_LIST",
		"RESTAURANT": "RESTAURANT",
		"MANGO_POST": "POST",
    "EMAIL_VERIFICATION": "EMAIL_VERIFICATION",
    "PURCHASED_EAT_DEAL": "eat_deal_purchase",
    "RESERVATION_RESTAURANTS": "reservations",
    "RESERVATION_RESTAURANT": "reservation",
    "MY_RESERVATIONS": "my_reservations",
    "MY_RESERVATION": "my_reservation",
    "REVIEW_WRITING": "REVIEW_WRITING",
    "SEARCH": "search",
    "EAT_DEAL": "eat_deal",
    "EAT_DEALS": "eat_deals",
    "EAT_DEAL_COLLECTIONS": "eat_deal_collection",
	};

	branch_io_service.page_data = {};
	branch_io_service.set_page_data = {};

	/**
	 * 세팅 정보.
	 * @type {{branch_key: string, user_data: string}}
	 */
	branch_io_service.config = {
		"branch_key": "key_live_beeMcFpDWQgi7SKuIfO8hbmnvyac1zPZ",
		"IOS_url": "https://itunes.apple.com/kr/app/id628509224",
		"Android_url": "https://play.google.com/store/apps/details?id=com.mangoplate",
		"user_data": {}
	};

	/**
	 * 초기화 여부.
	 * @type {boolean}
	 */
	branch_io_service.is_init = false;

	/**
	 * 초기화 메서드.
	 * @returns {{object}}
	 */
	branch_io_service.init = function(page_key, page_data){
		if (this.is_init || !window.branch){
			return false;
		} else {
			branch = window.branch;
		}

		this.init_page_data_function();
		this.set_page_mapping_data(page_key, page_data);

		return branch.init(this.config.branch_key, {}, function(err, data){
			if (err){
				console.error(err);
				return;
			}

			this.config.user_data = data;
			this.is_init = true;
		}.bind(this));
	};

	/**
	 * 각 페이지 Mapping되는 DataSet을 만들어주는 메서드.
	 * @returns {object} - 해당 페이지에 Mapping되는 데이터.
	 */
	branch_io_service.set_page_mapping_data = function(page_key, page_data){
		var page_data_function = this["set_page_data"][page_key];

		if(typeof page_data_function === "function"){
			this.page_data = page_data_function(page_data);
		}
	};

  branch_io_service.make_data = function(destinationData, utm_url){
    var og_data = {
      "$desktop_url": window.location.href
    };

    var page_data = _.extend({}, destinationData, this.get_install_referrer(utm_url));
    return _.assign(og_data, page_data, {$deeplink_path: '', $android_deeplink_path: '', $ios_deeplink_path: ''});
  };

  branch_io_service.make_branch_link = function(data, callback){
    callback = callback || function(err, link){
      if (err){
        console.error(err);
        return false;
      }

      window.location.href = link;
    };

    branch.link({
      tags: [],
      channel: 'mp_web',
      feature: 'web_to_app_conversion',
      data: data
    }, callback);
  };

	/**
	 * DeepLink를 만들어서 반환하는 메서드.
	 */
  branch_io_service.make_link = function(utm_url){
    if(_isAndroid() && getParameter('utm_source') === 'pikicast') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.mangoplate'
      return new Promise();
    }

    return new Promise(function(resolve, reject){
      var branch_data = this.make_data(this.page_data, utm_url);

      this.make_branch_link(branch_data, function(err, link){
        if (err){
          console.error(err);
          reject(resolve);
          return false;
        }
        window.location.href = link;
      });
    }.bind(this));
	};

	branch_io_service.get_install_referrer = function(utm_install_referrer){
		return {
			"install_referrer": utm_install_referrer
		}
	};

	branch_io_service.init_page_data_function = function(){
		var this_set_page_data = this["set_page_data"];

		this_set_page_data[this.PAGE_KEY.TOP_LIST] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.TOP_LIST,
				"extra": data
			};
		};

		this_set_page_data[this.PAGE_KEY.MANGO_POST] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.MANGO_POST,
				"extra": data
			}
		};

		this_set_page_data[this.PAGE_KEY.RESTAURANT] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.RESTAURANT,
				"extra": data
			}
		}

		this_set_page_data[this.PAGE_KEY.EMAIL_VERIFICATION] = function(data) {
		  return {
		    "destination": "signup/email_verification",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.PURCHASED_EAT_DEAL] = function (data) {
		  return {
        "destination": "eat_deal_purchase",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.RESERVATION_RESTAURANTS] = function (data) {
		  return {
        "destination": "reservations",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.RESERVATION_RESTAURANT] = function (data) {
      return {
        "destination": "reservation",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.MY_RESERVATION] = function (data) {
      return {
        "destination": "my_reservation",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.MY_RESERVATIONS] = function (data) {
      return {
        "destination": "my_reservations",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.SEARCH] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.SEARCH,
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.REVIEW_WRITING] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.RESTAURANT,
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.EAT_DEAL] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.EAT_DEAL,
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.EAT_DEALS] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.EAT_DEALS,
        "extra": undefined
      }
    }

    this_set_page_data[this.PAGE_KEY.EAT_DEAL_COLLECTIONS] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.EAT_DEAL_COLLECTIONS,
        "extra": data
      }
    }
	};

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if (window.mp20){
		window.mp20.branch_io_service = branch_io_service;
	} else {
		window.mp20 = {};
		window.mp20.branch_io_service = branch_io_service;
	}
})();
(function(){
	var wannago_sign_popup = {};

	wannago_sign_popup.now_tab = "signin";
	wannago_sign_popup.select_tab_class = "selected";
	wannago_sign_popup.open_class = "on";
	wannago_sign_popup.popup_name = "PU_WANNAGO_LOGIN";

	wannago_sign_popup.tab_code = {
		"signin": "signin",
		"signup": "signup"
	};

	wannago_sign_popup.dom = {
		"popup": ".wannago_login_popup",
		"popup_main_image": ".wannago_login_popup_main_img",
		"popup_msg": ".wannago_login_popup_msg",
		"tabs": ".wannago_login_popup_main_tab .tab",
		"signin_tab": ".wannago_login_popup_signin",
		"signup_tab": ".wannago_login_popup_signup",
		"facebook_text": ".wannago_login_popup_facebook_text",
		"kakao_text": ".wannago_login_popup_kakao_text",
		"close_btn": ".close_btn",
		"wannago_login_popup_sign_wrap": ".wannago_login_popup_sign_wrap",
		"black_screen": ".black_screen",
		"facebook_btn": ".wannago_login_popup_sign.facebook",
		"kakao_btn": ".wannago_login_popup_sign.kakao"
	};

	var resources = {
    ko: {
      signin: {
        popup_msg: "로그인 해보세요<br />가고싶은 곳을 저장할 수 있어요",
        kakao_msg: "클릭 한 번이면 카카오톡 로그인",
        facebook_msg: "클릭 한 번이면 페이스북 로그인"
      },
      signup: {
        popup_msg: "회원가입 해보세요<br />가고싶은 곳을 저장할 수 있어요",
        kakao_msg: "클릭 한 번이면 카카오톡 회원가입",
        facebook_msg: "클릭 한 번이면 페이스북 회원가입"
      }
    },

    en: {
      signin: {
        popup_msg: "Sign in and you can save the places you 'wannago'!",
        kakao_msg: "Sign in via KakaoTalk with one click",
        facebook_msg: "Sign in via Facebook with one click"
      },
      signup: {
        popup_msg: "Sign up and you can save the places you 'wannago'!",
        kakao_msg: "Sign up via KakaoTalk with one click",
        facebook_msg: "Sign up via Facebook with one click"
      }
    }
  };

  var used_locale = resources[get_locale()];
	wannago_sign_popup.init = function(){
		this.bind_event();
	};

	wannago_sign_popup.tab_active_obj= {
		"signin": function(){
			var $popup = $(this.dom.popup),
					$image = $popup.find(this.dom.popup_main_image),
					$msg = $popup.find(this.dom.popup_msg),
					$signin_tab = $popup.find(this.dom.signin_tab),
					$kakao_text = $popup.find(this.dom.kakao_text),
					$facebook_text = $popup.find(this.dom.facebook_text),
					$wannago_login_popup_sign_wrap = $popup.find(this.dom.wannago_login_popup_sign_wrap);

			trackEvent("CLICK_WANNAGO_LOG_IN");
			$image.attr("src", get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/belwdh7sngu0nq9r.png", undefined, undefined, "png"));
			$msg.html(used_locale.signin.popup_msg);
			$signin_tab.addClass(this.select_tab_class);
			$kakao_text.html(used_locale.signin.kakao_msg);
			$facebook_text.html(used_locale.signin.facebook_msg);
			$wannago_login_popup_sign_wrap.removeClass("signup");
		},
		"signup": function(){
			var $popup = $(this.dom.popup),
					$image = $popup.find(this.dom.popup_main_image),
					$msg = $popup.find(this.dom.popup_msg),
					$signup_tab = $popup.find(this.dom.signup_tab),
					$kakao_text = $popup.find(this.dom.kakao_text),
					$facebook_text = $popup.find(this.dom.facebook_text),
					$wannago_login_popup_sign_wrap = $popup.find(this.dom.wannago_login_popup_sign_wrap);

      trackEvent("CLICK_WANNAGO_SIGN_UP");
			$image.attr("src", "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/zdqfzo8gcjmjec34.png");
			$msg.html(used_locale.signup.popup_msg);
			$signup_tab.addClass(this.select_tab_class);
			$kakao_text.html(used_locale.signup.kakao_msg);
			$facebook_text.html(used_locale.signup.facebook_msg);
			$wannago_login_popup_sign_wrap.addClass("signup");
		}
	};

	wannago_sign_popup.bind_event = function(){
		var $popup = $(this.dom.popup),
				$tabs = $popup.find(this.dom.tabs),
				$close_btn = $popup.find(this.dom.close_btn),
				$black_screen = $popup.next(this.dom.black_screen),
				$facebook_btn = $popup.find(this.dom.facebook_btn),
				$kakao_btn = $popup.find(this.dom.kakao_btn);

		$tabs.on("click", function(e){
			var $target = $(e.target),
					tab_name = $target.data("tab_name"),
					tab_function;

			if(this.now_tab === tab_name){return false;}

			this.now_tab = tab_name;

			tab_function = this.tab_active_obj[tab_name];

			if(typeof tab_function === "function"){
				$tabs.removeClass(this.select_tab_class);
				tab_function.bind(this)();
			}
		}.bind(this));

		$close_btn.on("click", function(){
      trackEvent("CLICK_WANNAGO_CLOSE_BTN");
			this.close();
		}.bind(this));

		$black_screen.on("click", function(){
      trackEvent("CLICK_WANNAGO_CLOSE_OTHER");
			this.close();
		}.bind(this));

		$facebook_btn.on("click", function(){
			switch (wannago_sign_popup.now_tab){
				case wannago_sign_popup.tab_code.signin:
          trackEvent("CLICK_WANNAGO_LOG_IN_FACEBOOK");
					break;
				case wannago_sign_popup.tab_code.signup:
          trackEvent("CLICK_WANNAGO_SIGN_UP_FACEBOOK");
					break;
			}
			mp_facebook.login();
		});

		$kakao_btn.on("click", function(){
			switch (wannago_sign_popup.now_tab){
				case wannago_sign_popup.tab_code.signin:
          trackEvent("CLICK_WANNAGO_LOG_IN_KAKAO");
					break;
				case wannago_sign_popup.tab_code.signup:
          trackEvent("CLICK_WANNAGO_SIGN_UP_KAKAO");
					break;
			}

			mp_kakao.login();
		});
	};

	wannago_sign_popup.open = function(){
		var $popup = $(this.dom.popup);
		trackView(this.popup_name);
		$popup.addClass(this.open_class);
	};

	wannago_sign_popup.close = function(){
		var $popup = $(this.dom.popup);
		closeView(this.popup_name);
		$popup.removeClass(this.open_class);
	};

	wannago_sign_popup.init();

	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.wannago_popup){
			window.mp20.wannago_popup.wannago_sign_popup = wannago_sign_popup;
		} else {
			window.mp20.wannago_popup = {};
			window.mp20.wannago_popup.wannago_sign_popup = wannago_sign_popup;
		}
	} else {
		window.mp20 = {};
		window.mp20.wannago_popup = {};
		window.mp20.wannago_sign_popup = wannago_sign_popup;
	}
})();
(function(){
	var wannago_go_app_popup = {};

	wannago_go_app_popup.open_class = "on";
	wannago_go_app_popup.popup_name = "PU_WANNAGO_MORE";

	wannago_go_app_popup.dom = {
		"popup": ".wannago_go_app_popup",
		"black_screen": ".black_screen",
		"close_btn": ".close_btn"
	};

	wannago_go_app_popup.open = function(){
		var $popup = $(this.dom.popup);

		$popup.addClass(this.open_class);
		trackView(this.popup_name);
	};

	wannago_go_app_popup.close = function(){
		var $popup = $(this.dom.popup);
		$popup.removeClass(this.open_class);
		closeView(this.popup_name);
	};

	wannago_go_app_popup.bind_event = function(){
		var $popup = $(this.dom.popup);

		$popup.find(this.dom.close_btn).on("click", function(){
			trackView("CLICK_WANNAGO_CLOSE_BTN");
			this.close();
		}.bind(this));

		$popup.next(this.dom.black_screen).on("click", function(){
      trackView("CLICK_WANNAGO_CLOSE_OTHER");
			this.close();
		}.bind(this));
	};

	wannago_go_app_popup.bind_event();

	/**
	 * 전역객체에 바인딩.
	 */
	if (window.mp20){
		if (window.mp20.wannago_popup){
			window.mp20.wannago_popup.wannago_go_app_popup = wannago_go_app_popup;
		} else {
			window.mp20.wannago_popup = {};
			window.mp20.wannago_popup.wannago_go_app_popup = wannago_go_app_popup;
		}
	} else {
		window.mp20 = {};
		window.mp20.wannago_popup = {};
		window.mp20.wannago_go_app_popup = wannago_go_app_popup;
	}
})();
(function () {
  var CookieStorage = (function () {
    return {
      get length() {
        return _.size($.cookie());
      },

      getItem: function (key) {
        if (!key) {
          return null;
        }

        return $.cookie(key) || null;
      },

      setItem: function (key, value, option) {
        if (!key) {
          return;
        }

        $.cookie(key, value, option);
      },

      removeItem: function (key) {
        $.removeCookie(key);
      },

      clear: function () {

      }
    };
  })();

  window.CookieStorage = CookieStorage;
})();
(function () {
  var AdSlotByAreaStorage = (function () {
    var storage = {};

    return {
      get: function (slotElementId) {
        return storage[slotElementId];
      },

      set: function (slotElementId, area) {
        storage[slotElementId] = area;
      }
    };
  })();

  window.AdSlotByAreaStorage = AdSlotByAreaStorage;
})();
(function () {
  var AdRepo = function (json) {
    this._records = _.map(json, function (e) {
      return new AdInventory(
        e.platform,
        e.page,
        e.inventory,
        e.tag,
        e.sizes,
        e.args
      );
    });
  };

  AdRepo.prototype = {
    find: function (platform, page, inventory) {
      return _.findWhere(this._records, {
        platform: platform,
        page: page,
        name: inventory
      });
    },

    where: function (condition) {
      var clause = {};
      var regex = {};

      _.each(condition, function (v, k) {
        if (!_.isRegExp(v)) {
          clause[k] = v;
        } else {
          regex[k] = v;
        }
      });

      return _.filter(this._records, function (e) {
        if (!_.every(clause, function (v, k) {
            return e[k] === v;
          })) {
          return false;
        } else if (!_.every(regex, function (v, k) {
            return e[k].match(v);
          })) {
          return false;
        }

        return true;
      });
    }
  };

  window.AdRepo = AdRepo;
})();
(function () {
  var AdInventory = function (platform, page, name, tag, sizes, args) {
    this._platform = platform;
    this._page = page;
    this._name = name;
    this._tag = tag;
    this._sizes = sizes;
    this._args = args || {};
  };

  AdInventory.prototype = {
    get platform() {
      return this._platform;
    },

    get page() {
      return this._page;
    },

    get name() {
      return this._name;
    },

    get tag() {
      return this._tag;
    },

    get sizes() {
      return this._sizes;
    },

    get display_type() {
      return this.arg_value('display_type', 'banner');
    },

    arg_value: function (name, default_value) {
      return this._args.hasOwnProperty(name) ? this._args[name].value : default_value;
    }
  };

  window.AdInventory = AdInventory;
})();
(function () {
  var AdAreaPool = function () {
    this._pool = {};
  };

  AdAreaPool.prototype = {
    add: function (area) {
      if (area.id in this._pool)
        return false;

      this._pool[area.id] = area;
      return true;
    },

    get: function (area_id) {
      return this._pool[area_id];
    },

    get areas() {
      return _.values(this._pool);
    }
  };

  window.AdAreaPool = AdAreaPool;
})();

(function () {
  var Placer = function () {

  };

  Placer.replace = function (position, $wrapper) {
    $(position).replaceWith($wrapper);
  };

  Placer.after = function (position, $wrapper) {
    $(position).after($wrapper);
  };

  window.AdPlacer = Placer;
})();

(function () {
  var AdRenderer = function () {
    this._area_pool = new AdAreaPool();
  };

  AdRenderer.area_id = function(inventory, index) {
    var id_elements = [inventory.platform, inventory.page, inventory.name];

    if (!_.isUndefined(index) && !_.isNull(index)) {
      id_elements.push(index);
    }

    return id_elements.join('-');
  };

  AdRenderer.area_content_id = function(inventory, index) {
    return AdRenderer.area_id(inventory, index) + '-content';
  };

  AdRenderer.prototype = {
    get areas() {
      return this._area_pool.areas;
    },

    find_area: function(inventory, index) {
      return this._area_pool.get(AdRenderer.area_id(inventory, index));
    },

    render: function (inventory, position, placer, index, class_names) {
      if(_.isNull(inventory) || _.isUndefined(inventory))
        return;

      class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
      class_names.push(inventory.name);
      if (inventory.platform === 'web_mobile') {
        class_names.push('only-mobile');
      } else if (inventory.platform === 'web_desktop') {
        class_names.push('only-desktop');
      }

      var delegator;
      switch (inventory.arg_value('display_type', 'banner')) {
        case 'popup':
          delegator = AdPopup;
          break;

        case 'custom_photo':
          delegator = AdCustomPhoto;
          break;

        case 'banner':
        default:
          delegator = AdBanner;
          break;
      }

      var area = new delegator(
        inventory,
        index,
        class_names
      );

      this._area_pool.add(area);

      area.render(position, placer);
      return area;
    }
  };

  window.AdRenderer = AdRenderer;
})();
(function () {
  var Publisher = function (args) {
    args = args || {};

    window.googletag.cmd.push(function () {
      window.googletag.pubads().disableInitialLoad();
      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();

      if (args.hasOwnProperty('coordinate')) {
        window.googletag.pubads().setLocation(args.coordinate.lat, args.coordinate.lon);
      }

      if (args.hasOwnProperty('targeting')) {
        var targeting = args.targeting;
        for (var key in targeting) {
          if(!targeting.hasOwnProperty(key)) continue;
          var value = targeting[key];
          if (value) {
            window.googletag.pubads().setTargeting(key, value);
          }
        }
      }

      window.googletag.enableServices();
    });
  };

  Publisher.prototype = {
    add_event_listener: function(event, fn) {
      window.googletag.cmd.push(function() {
        window.googletag.pubads().addEventListener("slotRenderEnded", function (event) {
          fn(event);
        });
      });
    },

    publish: function (areas) {
      window.googletag.cmd.push(function () {
        var slot;
        var slots = [];
        _.each(areas, function (area) {
          if (area.inventory.sizes) {
            var max_size = _.max(area.inventory.sizes, function(e) {
              return e[0];
            });
            var min_size = _.min(area.inventory.sizes, function(e) {
              return e[0];
            });

            var size = (document.documentElement.clientWidth >= 336) ? max_size : min_size;
            slot = window.googletag.defineSlot(
              area.inventory.tag,
              [size],
              area.content_id
            )
          } else {
            slot = window.googletag.defineOutOfPageSlot(
              area.inventory.tag,
              area.content_id
            );
          }

          if (slot) {
            AdSlotByAreaStorage.set(slot.getSlotElementId(), area);
            slot.addService(window.googletag.pubads());
            slots.push(slot);
            window.googletag.display(area.content_id);
          }

        }.bind(this));

        window.googletag.pubads().refresh(slots);
      }.bind(this));
    }
  };

  window.Publisher = Publisher;
})();

var AdSeries = function () {
  var AdSeries = function (a, b, count) {
    this.a = a;
    this.b = b;
    this.count = count;
  };

  AdSeries.prototype = {
    contains: function (value) {
      if (this.b === 0) {
        return this.a === value;
      }

      var matched = (value - this.a) % this.b === 0 && this.index(value) >= 0;
      if(_.isNull(this.count) || _.isUndefined(this.count))
        return matched;

      return matched && this.index(value) < this.count;
    },

    value: function (index) {
      return this.a + this.b * index;
    },

    index: function (value) {
      return (value - this.a) / this.b;
    },

    toArray: function (count) {
      count = count || this.count;

      var arr = [];
      for (var i = 0; i < count; i++) {
        arr.push(this.value(i));
      }
      return arr;
    }
  };

  return AdSeries;
}();

(function () {
  var AdMatcher = function () {
  };

  AdMatcher.is_match = function (inventory, index) {
    var start = inventory.arg_value('start', 0);
    var every = inventory.arg_value('every', 0);
    var series = new AdSeries(start, every);

    return AdMatcher.is_match_with(series, index);
  };

  AdMatcher.is_match_with = function (series, index) {
    return series.contains(index);
  };

  window.AdMatcher = AdMatcher;
})();
(function () {

  var AdRepeater = function () {
  };

  AdRepeater.repeat = function (inventories, collection, start_index, repeat_fn) {
    var index = start_index;
    _.each(collection, function (item) {
      _.each(inventories, function (i) {
        if(AdMatcher.is_match(i, index)) {
          repeat_fn(i, item, index);
        }
      });

      index++;
    });
  };

  window.AdRepeater = AdRepeater;
})();
(function () {
  var AdBanner = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
  };

  AdBanner.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    render: function (position, placer) {
      var $template = $('<div class="ad_wrap"><div class="content"></div></div>');
      $template.find('.content').attr('id', this.content_id);

      var $wrapper = $('<div class="ad_area"></div>');
      $wrapper
        .attr('id', this.id)
        .addClass(this._class_names.join(' '))
        .html($template);

      placer(position, $wrapper);
    },

    show: function (event) {

    }
  };

  window.AdBanner = AdBanner;
})();


(function () {
  var scrollCallback;

  function scrollLock() {
    $('body').css('overflow', 'hidden');

    scrollCallback = function () {
      window.scrollTo(0, 0);
    };
    $(document).bind('scroll', scrollCallback);
  }

  function scrollUnlock() {
    $('body').css('overflow', 'visible');
    $(document).unbind('scroll', scrollCallback);
  }

  var AdPopup = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
  };

  AdPopup.closeAd = function () {
    scrollUnlock();
    $('.dfp_ad_front_popup').hide();
  };

  AdPopup.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    render: function (position, placer) {
      var $wrapper = $('<div class="dfp_ad_front_popup">' +
        '  <div class="dfp_ad_front_banner_wrap">\n' +
        '    <div class="dfp_ad_front_banner_content">\n' +
        '      <div class="ad_area">\n' +
        '        <div class="ad_wrap"><div class="content"></div></div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');

      $wrapper.on('click', function () {
        AdPopup.closeAd();
      });

      $wrapper
        .addClass([this.inventory.platform, this.inventory.name].join('_'))
        .addClass(this._class_names.join(' '));

      $wrapper.find('.ad_area')
        .attr('id', this.id);

      $wrapper.find('.content').attr('id', this.content_id);

      placer(position, $wrapper);
    },

    show: function (event) {
      AdPopupManager.setCreativeID(event.creativeId);

      if (!AdPopupManager.isCanShowPopup()) {
        return;
      }

      var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());
      var $element = $('.dfp_ad_front_popup.' + area.inventory.platform + '_' + area.inventory.name);
      switch (area.inventory.arg_value('display', 'once')) {
        case 'every':
          this._fadeIn($element);
          break;

        case 'once':
        default:
          // 전면 팝업은 인벤토리에 관계 없이 세션당 1회 노출되어야 함
          if (window.sessionStorage) {
            if (!window.sessionStorage.getItem('ad_popup')) {
              this._fadeIn($element);
              window.sessionStorage.setItem('ad_popup', true);
            }
          } else {
            if ($.cookie('ad_popup') === undefined) {
              this._fadeIn($element);
              $.cookie('ad_popup', true, {path: '/'});
            }
          }
      }
    },

    _fadeIn: function ($element) {
      $element.fadeIn();
      scrollLock();
    }
  };

  window.AdPopup = AdPopup;
})();
(function () {
  var AdCustomPhoto = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];

    window.addEventListener('message', function (event) {
      if (event.data.img) {
        this._data = event.data;
      }
    }.bind(this));
  };

  var template = _.template('<div><div id="photo_viewer_ad">\n' +
    '<a class="photo_wrap" href="{{link_url}}" target="_blank" style="background-image: url({{img}});height: {{height}}px">\n' +
    '</a>\n' +
    '<a class="ad_detail_btn" href="{{link_url}}" target="_blank">더 알아보기<img class="ad_detail_btn_arrow" src="https://mp-seoul-image-production-s3.mangoplate.com/web/resources/phgvzdixyeycxuay.png" alt="text_arrow_img" />\n' +
    '</a>\n' +
    '</div></div>');

  function get_image_height(width_ratio, height_ratio) {
    var viewport_width = document.documentElement.clientWidth;
    return (viewport_width * height_ratio) / width_ratio;
  }

  AdCustomPhoto.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    get $element() {
      return template({
        link_url: this._data.link_url,
        img: this._data.img,
        height: get_image_height(5,4)
      });
    },

    render: function (position, placer) {
      var $template = $('<div class="ad_wrap"><div class="content"></div></div>');
      $template.find('.content').attr('id', this.content_id);

      var $wrapper = $('<div class="ad_area"></div>');
      $wrapper
        .attr('id', this.id)
        .addClass(this._class_names.join(' '))
        .html($template);

      placer(position, $wrapper);
    }
  };

  window.AdCustomPhoto = AdCustomPhoto;
})();
(function () {
  var STORAGE_KEY = {
    BLOCKED_CREATIVE_ID: 'BlockedPopupCreativeID',
    BLOCKED_CREATIVE_DATE: 'BlockedPopupCreativeDate'
  };
  var Storage = window.localStorage
    ? window.localStorage
    : window.cookieStorage;
  var COOKIE_OPTION = {expires: 1000, path: '/'};

  var AdPopupManager = function (locale) {
    this._creativeID = null;
    this._locale = locale;
  };
  var ALLOW_LOCALE = ['ko'];

  AdPopupManager.prototype = {
    setCreativeID: function (creativeID) {
      this._creativeID = creativeID;
    },

    isCanShowPopup: function () {
      if (!this._creativeID) {
        return false;
      }

      if (!this._isAllowLocale()) {
        return false;
      }

      if (this._isSameBlockedCreativeID()) {
        return this._hasBlockedDate()
          ? this._isOverBlockedDate()
          : false
      }

      return true;
    },

    showAdPopup: function (ad_popup, ad_popup_event) {
      if (is_mobile_viewport()) {
        // 모바일 경우 앱 유도 팝업 -> 전면 팝업 순으로 나오게 처리
        if (window.mp20.PopupUseAppView) {
          window.mp20.PopupUseAppView.show(ad_popup, ad_popup_event);
        }
      } else {
        // 테스크탑일 경우 기존대로 바로 보여주기
        if (window.mp20.PopupUseAppView) {
          window.mp20.PopupUseAppView.clear();
        }
        if (ad_popup && ad_popup_event) {
          ad_popup.show(ad_popup_event);
        }
      }
    },

    blockCreative: function () {
      this._setBlockedCreativeID();
      this._removeSameBlockedDate();
    },

    blockCreativeByToday: function () {
      this._setBlockedCreativeID();
      this._setSameBlockedDate();
    },

    clearAll: function() {
      this.clearLocalData();
      this.clearSession();
    },

    clearSession: function() {
      window.sessionStorage.removeItem('ad_popup');
    },

    clearLocalData: function() {
      this._removeSameBlockedDate();
      this._removeSameBlockedID();
    },

    _setBlockedCreativeID: function () {
      Storage.setItem(
        STORAGE_KEY.BLOCKED_CREATIVE_ID,
        this._creativeID,
        {expires: 1000, path: '/'}
      );
    },

    _setSameBlockedDate: function () {
      Storage.setItem(
        STORAGE_KEY.BLOCKED_CREATIVE_DATE,
        this._getTodayValue(),
        COOKIE_OPTION
      );
    },

    _removeSameBlockedDate: function () {
      Storage.removeItem(STORAGE_KEY.BLOCKED_CREATIVE_DATE);
    },

    _removeSameBlockedID: function() {
      Storage.removeItem(STORAGE_KEY.BLOCKED_CREATIVE_ID);
    },

    _getTodayValue: function () {
      var now = new Date();

      return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    },

    _isSameBlockedCreativeID: function () {
      var blockedCreativeID = this._getBlockedCreativeID();

      return this._creativeID.toString() === (blockedCreativeID ? blockedCreativeID.toString() : null);
    },

    _getBlockedCreativeID: function () {
      return Storage.getItem(STORAGE_KEY.BLOCKED_CREATIVE_ID);
    },

    _isOverBlockedDate: function () {
      var blockedDate = this._getBlockedDate();

      return this._getTodayValue() > (blockedDate ? blockedDate.valueOf() : 0);
    },

    _getBlockedDate: function () {
      return Storage.getItem(STORAGE_KEY.BLOCKED_CREATIVE_DATE);
    },

    _hasBlockedDate: function () {
      return !!this._getBlockedDate()
    },

    _isAllowLocale: function () {
      return ALLOW_LOCALE.indexOf(this._locale) > -1;
    }
  };

  window.AdPopupManager = new AdPopupManager(I18n.locale);
})();
(function () {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  var AdManager = function () {
    this._repo = new AdRepo(parse_json($('#dfp_ads').html(), []));
    this._area_renderer = new AdRenderer();

    var args = {};
    var dfp_targeting = parse_json($('#dfp_targeting').html(), undefined);
    if (dfp_targeting !== undefined) {
      args['targeting'] = dfp_targeting;
    }

    this._publisher = new Publisher(args);

    this._is_previous_viewport_mobile = is_mobile_viewport();
    this._handle_window_resize();
    this._handle_ad_area();
    this._handle_impression();
  };

  var instance;
  AdManager.get_instance = function () {
    instance = instance ? instance : new AdManager();

    return instance;
  };

  AdManager.prototype = {
    get repo() {
      return this._repo;
    },

    get area_renderer() {
      return this._area_renderer;
    },

    publish: function () {
      this._render_placeholders();
      this._publisher.publish(this._areas_by_viewport());
    },

    _render_placeholders: function () {
      var areas = {};
      _.each($('.ad_placeholder').toArray(), function (e) {
        var $e = $(e);
        var area = this._area_renderer.render(
          this.repo.find($e.data('platform'), $e.data('page'), $e.data('inventory')),
          $e,
          AdPlacer.replace,
          undefined
        );
        areas[area.id] = area;
      }.bind(this));

      this._publisher.add_event_listener("slotRenderEnded", function (event) {
        var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());
        if (area.inventory.arg_value('display_type', undefined) === 'popup') {
          if (areas[area.id]) {
            window.AdPopupManager.showAdPopup(areas[area.id], event);
          }
        }
      });
    },

    _areas_by_viewport: function () {
      if (is_mobile_viewport()) {
        return _.filter(this._area_renderer.areas, function (e) {
          return e.inventory.platform === 'web_mobile';
        });
      }

      return _.filter(this._area_renderer.areas, function (e) {
        return e.inventory.platform === 'web_desktop';
      });
    },

    _handle_window_resize: function () {
      var handle_resize = _.throttle(function () {
        if (this._is_previous_viewport_mobile !== is_mobile_viewport()) {
          this.publish();
          this._is_previous_viewport_mobile = is_mobile_viewport();
        }
      }.bind(this), 100);

      $(window).on('resize', handle_resize);
    },

    _handle_ad_area: function () {
      window.googletag.cmd.push(function () {
        window.googletag.pubads().addEventListener('slotRenderEnded', function (event) {
          var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());
          var $content = $('#' + area.content_id);
          if (!event.advertiserId) {
            $content.parents(".ad_area").hide();
            return;
          }
        }.bind(this));
      }.bind(this));
    },

    _handle_impression: function () {
      window.googletag.cmd.push(function () {
        window.googletag.pubads().addEventListener('impressionViewable', function (event) {
          var slot = event.slot;

          if (window.AdImpressionNotifier) {
            window.AdImpressionNotifier.send_message(slot.getResponseInformation().sourceAgnosticLineItemId,
              slot.getAdUnitPath());
          }
        });
      });
    },

    _is_direct_ad: function ($element) {
      return !$element.find('iframe').data('is-safeframe');
    }
  };

  window.AdManager = AdManager;
})();
(function () {
  /**
   * 전역객체에 바인딩.
   */
  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.vo = {};
  window.mp20.model = {};
  window.mp20.view = {
    templateBuilder: {},
    decorator: {}
  };
  window.mp20.controller = {};
  window.mp20.service = {};
  window.mp20.constants = {};
  window.mp20.utils = {};
  window.mp20.mapper = {};
  window.mp20.module = {};
})();
(function () {
  var constants = (function () {
    return {
      MANGO_API_HOST: 'https://stage.mangoplate.com',
      IMAGE_UPLOAD_HOST: 'https://image-upload.mangoplate.com',
      ANALYTIES_HOST: 'https://tracking.mangoplate.com/collect',
      MANGO_ORIGIN: 'mangoplate.com',

      IMAGE_UPLOAD_API_KEY: 'OCPgtFnAx27bDWd0gS74Z5hmnv3KV1pJ7TPeykTc',
      USER_FALLBACK_IMAGE_URL: 'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80',
      DEFAULT_IMAGE_SIZE: {
        USER_PROFILE: 56,
        RESTAURANT_LIST: 738,
      },

      RESULT_CODE: {
        SUCCESS: 200,
        ERROR: 500,
        UNAUTHORIZED: 401,
        MAINTENANCE_MODE: 911
      },

      STATUS_CODES: {
        ACTIVE: 1,
        CLOSED: 2,
        PENDING: 3,
        DUPLICATED: 4,
        NEED_MORE_INFO: 5,
        INACTIVE: 0
      },

      MESSAGE_TYPE: {
        EAT_DEAL_PURCHASE_LOADED: 'EatDealPurchase/loaded',
        EAT_DEAL_PURCHASE_INIT: 'EatDealPurchase/init',
        EAT_DEAL_PURCHASE_RESULT: 'EatDealPurchase/result',
      },

      EAT_DEAL_RESULT_STATE: {
        SUCCESS: 'success',
        FAIL: 'fail',
      },

      EAT_DEAL_STATUS: {
        // Client Status
        NOT_ONLY_TARGET_USER_FOR_ZERO_DEAL: 1001,
        NOT_ONLY_HOLIC_USER_FOR_DEAL: 1002,

        // Server Status
        CAN_PURCHASE: 100,
        BEFORE_SALES: 510,
        OUT_OF_ORDER: 520,
        SALES_END: 530,
        EXCEEDED_INDIVIDUAL_HOLD_COUNT: 540,
        EXCEEDED_INDIVIDUAL_PURCHASE_COUNT: 550
      },

      ANALYTIC_PAGE_NAME: {
        HOME: 'PG_MAIN',
        EAT_DEAL_DETAIL: 'PG_EATDEAL',
        EAT_DEAL_DETAIL_SHARE_LAYER: 'PU_EATDEAL_SHARE',
        EAT_DEAL_DETAIL_PICTURE_LAYER: 'PU_EATDEAL_PICTURE',
        EAT_DEAL_DETAIL_COMPLETE_LAYER: 'PU_EATDEAL_FINISH',
        EAT_DEAL_COLLECTION_DETAIL: 'PG_EATDEAL_COLLECTION',
        EAT_DEAL_COLLECTION_SHARE_LAYER: 'PU_SHARE_EATDEAL_COLLECTION',
        STORY_MAIN: 'PG_STORY_LIST',
        TOPLIST_MAIN: 'PG_TOPLIST_LIST',
        TOPLIST: 'PG_TOPLIST',
        ENGAGEMENT_REVIEW_COMPOSER: 'PG_ENGAGEMENT_REVIEW_COMPOSER',
        STORY: 'PG_MANGOPICKS'
      },

      EAT_DEAL_PURCHASE_ERROR_CODE: {
        BROWSER_BACK: 30100,
        NOT_MATCHED_PASS_CODE: 40124,
        EXPIRED_PASS_CODE: 40125,
        EXCEEDED_INDIVIDUAL_HOLD_COUNT: 40514,
        ONLY_BUY_EATDEAL_FOR_HOLIK: 40312
      },

      EAT_DEALS_AND_COUPONS_ITEM_TYPE: {
        EAT_DEAL: 'eat_deal',
        COUPON: 'coupon'
      },

      EAT_DEAL_DISCOUNT_TYPE: {
        NONE: 'none',
        PRICE: 'price',
        RATE: 'rate'
      },

      APP_MARKET_LINK: {
        ANDROID: 'https://play.google.com/store/apps/details?id=com.mangoplate',
        IOS: 'https://itunes.apple.com/app/id628509224'
      },

      SUBACTION_TYPE: {
        DO_NOT_RECOMMEND: 1,
        ITS_OK: 2,
        RECOMMEND: 3
      },

      RESTAURANT_ACTION_TYPE: {
        REVIEW: 3
      },

      REVIEW_IMAGE_UPLOAD_ERROR_TYPE: {
        OVER_FILE_SIZE: 1,
        NOT_SUPPORT_FILE_EXTENSION: 2,
        MAX_PICTURE_COUNT: 3,
        UNKNOWN: 4
      },

      REVIEW_CONTEXT_MODE_TYPES: {
        WRITE: 'WRITE',
        EDIT: 'EDIT',
        DRAFT: 'DRAFT'
      },

      RELATED_CONTENT_TYPE: {
        MANGO_PICK: "mango_pick",
        TOP_LIST: "top_list",
        EAT_DEAL_COLLECTION: "eat_deal_collection"
      },

      REVIEW_PICTURE_UPLOADED_STATE: {
        NOT_UPLOADED: 'NOT_UPLOADED',
        UPLOADED: 'UPLOADED',
        READY: 'READY'
      },

      KAKAO_TALK_TEMPLATE_ID: {
        NORMAL_CONTENT: 13433,
        STORY_MY_LIST: 7903
      },

      RELATED_EAT_DEAL_PAGE_TYPE: {
        EAT_DEAL_DETAIL: 'eat_deal_detail',
        EAT_DEAL_PURCHASE_CONFIRMED: 'eat_deal_purchase_confirmed'
      }
    };
  })();

  mp20.constants = constants;
})();
(function () {
  function HttpFetcher() {

  }

  HttpFetcher.prototype = {
    get: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'GET',
        data: data,
      }, header, option);
    },

    post: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'POST',
        data: data,
      }, header, option);
    },

    put: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'PUT',
        data: data,
      }, header, option);
    },

    'delete': function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'DELETE',
        data: data,
      }, header, option);
    },

    _getPromise: function (config, headers, option) {
      option = option || {};
      var self = this;

      return new Promise(function (resolve, reject) {
        var defaultConfig = {
          success: function (data) {
            if (data.error) {
              var error_code = data.error.error_code;
              if (error_code === window.mp20.constants.RESULT_CODE.MAINTENANCE_MODE) {
                window.location.reload();
                reject(data.error);
                return;
              }
            }
            resolve(data);
          },

          error: function (err) {
            reject(err);
          },

          beforeSend: function (xhr) {
            self._setHeaderToRequest(xhr, headers, option);
          },
        };

        var baseParams = {};
        if (option.includeFileData) {
          baseParams = {
            contentType: false,
            processData: false,
          };
        }

        var params = _.assign(baseParams, defaultConfig, config);
        $.ajax(params);
      });
    },

    _setHeaderToRequest: function (xhr, headers, option) {
      for (var key in headers) {
        if (!headers.hasOwnProperty(key)) {
          continue;
        }

        if (option.includeFileData && key === 'Content-Type') {
          continue;
        }

        xhr.setRequestHeader(key, headers[key]);
      }
    },
  };

  window.mp20.utils['HttpFetcher'] = new HttpFetcher();
})();
(function () {
  var constants = window.mp20.constants;
  var httpFetcher = window.mp20.utils.HttpFetcher;
  var header = {
    Authorization: auth_service.get_access_token(),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  var getApiUrl = function (path) {
    return constants.MANGO_API_HOST + path;
  };
  var getData = function (data) {
    return _.assign({
      'language': get_language(),
      'device_uuid': get_device_uuid(),
      'device_type': get_device_type(),
    }, data);
  };
  var restaurantAdditionalInfoType = {
    RELATED_MANGO_PICKS: 'related_mango_picks',
    RELATED_TOP_LIST: 'related_list',
    NEAR_BY_POPULAR_RESTAURANT: 'near_popular_restaurants',
  };

  function toFormData(data) {
    var formData = new FormData();

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  }

  function HttpApi() {

  }

  HttpApi.prototype = {
    get: function (url, data) {
      return httpFetcher.get(
        url,
        getData(data),
        header
      );
    },

    post: function (url, data) {
      return httpFetcher.post(
        url,
        getData(data),
        header
      );
    },

    searchByFilter: function (filter, orderBy, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v6/search/by_filter.json'),
        getData({
          filter: filter,
          order_by: orderBy,
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getCommonCode: function () {
      return httpFetcher.get(
        getApiUrl('/api/common/codetable.js'),
        getData(),
        header
      );
    },

    getRestaurantsByKeys: function (restaurantKeys) {
      var restaurantKeysString = restaurantKeys.join(',');

      return httpFetcher.get(
        getApiUrl('/api/v2/web/recently_viewed/restaurants/by_restaurant_keys.json'),
        getData({
          restaurant_keys: restaurantKeysString,
        }),
        header
      );
    },

    wannago: function (restaurantUUID) {
      return httpFetcher.post(
        getApiUrl('/api/restaurant/action/create.json'),
        getData({
          action_type: 4,
          restaurant_uuid: restaurantUUID,
        }),
        header
      ).then(function (res) {
        if (res.error) {
          throw res.error;
        }

        return res;
      })
    },

    cancelWannago: function (actionID) {
      return httpFetcher.post(
        getApiUrl('/api/restaurant/action/delete.json'),
        getData({action_id: actionID}),
        header
      );
    },

    getWannagoRestaurants: function (memberUUID, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v5/consumers/' + memberUUID + '/wannago/restaurants.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getRestaurantByToplist: function (keyword, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/web/top_lists/' + keyword + '/restaurants.js'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getTopList: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/top_lists/list.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getTopListByKeyword: function (keyword, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/top_lists/list/search.json'),
        getData({
          keyword: keyword,
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getMangoPickList: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/mango_picks/list.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    checkVerifiedAccessToken: function (accessToken) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/verification/user.json'),
        getData(),
        {
          Authorization: accessToken,
        }
      );
    },

    policyAgreements: function (member_uuid, accessToken, policyAgreementsData) {
      return httpFetcher.post(
        getApiUrl('/api/v1/consumer/' + member_uuid + '/policy_agreements.json'),
        getData(policyAgreementsData),
        {
          Authorization: accessToken,
        }
      );
    },

    termsAgreements: function (accessToken, userID, revisionIDs) {
      return httpFetcher.post(
        getApiUrl('/api/terms/agreements.json'),
        getData({
          'userID': userID,
          'revisionIDs': revisionIDs,
        }),
        {
          Authorization: accessToken,
        }
      );
    },

    signInByFacebook: function (facebookID, facebookAccessToken) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/login/by_facebook.json'),
        getData({
          facebook_id: facebookID,
          facebook_access_token: facebookAccessToken
        })
      );
    },

    signUpByFacebook: function (FBUserInfo) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/signup/by_facebook.json'),
        getData({
          facebook_id: FBUserInfo.userId,
          facebook_access_token: FBUserInfo.accessToken,
          first_name: FBUserInfo.firstName,
          last_name: FBUserInfo.lastName,
          email: FBUserInfo.email,
          country: FBUserInfo.locale,
          picture_url: "",
          birthday: FBUserInfo.birthday,
        })
      );
    },

    startWithApple: function (clientId, sub, code, email, firstName, lastName) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/start_with/apple.json'),
        getData({
          client_id: clientId,
          sub: sub,
          code: code,
          email: email,
          first_name: firstName,
          last_name: lastName
        })
      );
    },

    getEatDeals: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deals/search/by_filter.json'),
        getData({
          filter: '{}',
          start_index: startIndex,
          request_count: requestCount,
          order_by: 0
        }),
        header
      );
    },

    getEatDealsFilterData: function () {
      return httpFetcher.post(
        getApiUrl('/api/v1/eat_deals/search/by_filter/count.json'),
        getData()
      );
    },

    getEatDealsByFilter: function (filter, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v2/eat_deals/search/by_filter.json'),
        getData({
          filter: JSON.stringify(filter),
          start_index: startIndex,
          request_count: requestCount,
          order_by: 0
        }),
        header
      );
    },

    uploadReviewPicture: function (base64EncodedPicture, pictureMimeType, restaurantID, userID) {
      var uriManager = new window.mp20.service.URIManager(constants.IMAGE_UPLOAD_HOST + '/upload-image');
      var key = restaurantID + '/' + userID + '_' + Date.now();
      uriManager.addQuery('key', key);
      uriManager.addQuery('content_type', pictureMimeType);

      // return new Promise(function (resolve) {
      //   httpFetcher.post(
      //     uriManager.get(),
      //     base64EncodedPicture,
      //     {
      //       'x-api-key': constants.IMAGE_UPLOAD_API_KEY
      //     }
      //   ).then(function (res) {
      //     setTimeout(function () {
      //       resolve(res);
      //     }, 3000);
      //   })
      // });

      return httpFetcher.post(
        uriManager.get(),
        base64EncodedPicture,
        {
          'x-api-key': constants.IMAGE_UPLOAD_API_KEY
        }
      );
    },

    getReview: function (restaurantKey, startIndex, requestCount, sortBy, actionValue) {
      var data = {
        start_index: startIndex,
        request_count: requestCount,
        sort_by: sortBy,
      };

      if (actionValue) {
        data.action_values = actionValue;
      }

      return httpFetcher.get(
        getApiUrl('/api/v5/restaurants/' + restaurantKey + '/reviews.json'),
        getData(data),
        header
      );
    },

    createReview: function (restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/create.json'),
        getData({
          restaurant_uuid: restaurantUUID,
          action_type: mp20.constants.RESTAURANT_ACTION_TYPE.REVIEW,
          action_value: recommendValue,
          comment: reviewText,
          comment_image_urls: pictureUrls,
        }),
        header
      );
    },

    updateReview: function (reviewKey, restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/update.json'),
        getData({
          comment_uuid: decodeReviewKey(reviewKey),
          restaurant_uuid: restaurantUUID,
          action_type: mp20.constants.RESTAURANT_ACTION_TYPE.REVIEW,
          action_value: recommendValue,
          comment: reviewText,
          comment_image_urls: pictureUrls,
        }),
        header
      );
    },

    deleteReview: function (reviewKey) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/delete.json'),
        getData({
          comment_uuid: decodeReviewKey(reviewKey)
        }),
        header
      );
    },

    getEatDealCollectionInfo: function (linkKey) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deal_collections/' + linkKey + '.json'),
        getData(),
        header
      )
    },

    getEatDealCollectionDeals: function (linkKey, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deal_collections/' + linkKey + '/eat_deals.json'),
        getData({
          filter: '{}',
          start_index: startIndex,
          request_count: requestCount
        }),
        header
      );
    },

    getEatDealCollectionDealsWithFilter: function (linkKey, filter, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deal_collections/' + linkKey + '/eat_deals.json'),
        getData({
          filter: JSON.stringify(filter),
          start_index: startIndex,
          request_count: requestCount
        }),
        header
      );
    },

    getEatDealCollectionRegionData: function (linkKey) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deal_collections/' + linkKey + '/eat_deals/count.json'),
        getData(),
        header
      );
    },

    getRecommendAndPopularKeyword: function () {
      return httpFetcher.get(
        getApiUrl('/api/v5/search/keyword/suggestion.json'),
        getData(),
        header
      );
    },

    getSuggestKeyword: function (keyword, seq) {
      return httpFetcher.get(
        getApiUrl('/api/v3/web/search/by_keyword/suggested.json'),
        getData({
          keyword: keyword,
          seq: seq
        }),
        header
      );
    },

    getRelatedEatDeals: function (eatDealId, pageType) {
      return httpFetcher.get(
        getApiUrl('/api/v1/eat_deals/' + eatDealId + '/related_eat_deals.json'),
        getData({
          page_type: pageType
        }),
        header
      );
    },

    getRelatedEatDealsByRestaurantKey: function (restaurantKey) {
      return httpFetcher.get(
        getApiUrl('/api/v8/restaurants/' + restaurantKey + '/eat_deals.json'),
        getData(),
        header
      );
    },

    getRestaurantAdditionalInfo: function (restaurantKey, fieldList) {
      return httpFetcher.get(
        getApiUrl('/api/v5/restaurants/' + restaurantKey + '/additional.json'),
        getData({
          fields: fieldList.join(','),
        }),
        header
      );
    },

    getRelatedStory: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.RELATED_MANGO_PICKS])
        .then(function (res) {
          return res.related_mango_picks;
        });
    },

    getNearByPopularRestaurant: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.NEAR_BY_POPULAR_RESTAURANT])
        .then(function (res) {
          return res.near_popular_restaurants;
        });
    },

    getRelatedTopList: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.RELATED_TOP_LIST])
        .then(function (res) {
          return res.related_list;
        });
    },

    getDraftReviews: function (restaurantUUID) {
      return httpFetcher.get(
        getApiUrl('/api/v6/reviews.json'),
        getData({
          restaurant_uuid: restaurantUUID,
          status: "DRAFT"
        }),
        header
      );
    },

    createDraftReview: function (restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.post(
        getApiUrl('/api/v6/reviews.json'),
        getData({
          restaurant_uuid: restaurantUUID,
          rating: recommendValue,
          content: reviewText,
          picture_urls: pictureUrls,
          status: "DRAFT"
        }),
        header
      );
    },

    updateDraftReview: function (reviewID, restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.put(
        getApiUrl('/api/v6/reviews/' + reviewID + '.json'),
        getData({
          restaurant_uuid: restaurantUUID,
          rating: recommendValue,
          content: reviewText,
          picture_urls: pictureUrls,
          status: "DRAFT"
        }),
        header
      );
    },

    deleteDraftReview: function (reviewID) {
      return httpFetcher.delete(
        getApiUrl('/api/v6/reviews/' + reviewID + '.json'),
        getData(),
        header
      );
    },

    getConfigurationsDeactivateAccount: function () {
      return httpFetcher.get(
        getApiUrl('/api/v1/configurations/deactivate_account.json'),
        getData(),
        header
      );
    },

    postDisactiveAccount: function (userID) {
      return httpFetcher.post(
        getApiUrl('/api/v1/deactivate_account/' + userID + '.json'),
        getData(),
        header
      );
    }
  };

  window.mp20.utils['HttpApi'] = new HttpApi();
})();
function trackEvent(event_name, event_label, evnet_value, page) {
  if (_.isNumber(event_label)) {
    event_label = event_label.toString()
  }
  if (_.isObject(event_label)) {
    try {
      event_label = JSON.stringify(event_label)
    } catch (e) {
      event_label = undefined;
    }
  }
  window.mp20.utils.AnalyticsHelper.trackEvent(event_name, event_label, evnet_value, page);
}

function trackViewEvent(event_name, event_label, evnet_value) {
  const page = window.mp20.utils.AnalyticsHelper.getCurrentPage();
  trackEvent(event_name, event_label, evnet_value, page);
}

function trackView(name) {
  window.mp20.utils.AnalyticsHelper.trackView(name);
}

function closeView(name) {
  window.mp20.utils.AnalyticsHelper.closeView(name);
}

function getCurrentPage() {
  return window.mp20.utils.AnalyticsHelper.getPage();
}
;
(function () {
  var PROTOCOL = {
    HTTP: 'http',
    HTTPS: 'https'
  };

  var SUB_DOMAIN_BY_PHASE = {
    ALPHA: 'alpha-web',
    BETA: 'beta-web',
    PRODUCTION: 'www'
  };

  var HOST_DOMAINS = [
    'alpha-web.mangoplate.com',
    'beta-web.mangoplate.com',
    'www.mangoplate.com'
  ];

  function URIManager(url) {
    this.url = URI(url || window.location.href);
  }

  URIManager.PHASE_BY_SUB_DOMAIN = SUB_DOMAIN_BY_PHASE;
  URIManager.prototype = {
    addQuery: function (key, value) {
      this.url.addQuery(key, value);
      return this;
    },

    removeQuery: function (keys) {
      this.url.removeQuery(keys);
      return this;
    },

    toHTTPS: function () {
      this.url.protocol(PROTOCOL.HTTPS);
      return this;
    },

    setSubDomain: function (subdomain) {
      this.url.subdomain(subdomain);
      return this;
    },

    get: function () {
      return this.url.toString();
    },

    getHost: function () {
      return this.url.host();
    },

    getQuery: function () {
      return this.url.query();
    },

    getPath: function () {
      return this.url.path();
    },

    getResource: function () {
      return this.url.resource();
    },

    getProtocol: function () {
      return this.url.protocol();
    },

    getSubDomain: function () {
      return this.url.subdomain();
    },

    getOrigin: function () {
      return this.url.origin();
    },

    isSameProtocol: function (protocol) {
      return this.getProtocol() === protocol;
    },

    isSameSubDomain: function (subdomain) {
      return this.getSubDomain() === subdomain;
    },

    isHTTPURL: function () {
      return this.isSameProtocol(PROTOCOL.HTTP);
    },

    isHTTPSURL: function () {
      return this.isSameProtocol(PROTOCOL.HTTPS);
    },

    toRedirect: function () {
      window.location.href = this.get();
    },

    isAlphaSubdomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.ALPHA);
    },

    isBetaSubDomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.BETA);
    },

    isProductionSubDomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.PRODUCTION) || this.isSameSubDomain('');
    },

    isTargetHostDomain: function () {
      return HOST_DOMAINS.includes(this.getHost())
    }
    
  };

  window.mp20.service['URIManager'] = URIManager;
})();
(function () {
  if (!auth_service.is_auth()) {
    return;
  }


  $(document).ready(function () {
    window.auth_service
      .auth_token_verify()
      .then(function () {
        return auth_service.get_auth_info_by_storage();
      })
      .then(function (authInfo) {
        var terms_agreements = auth_service.filter_terms_agreements(authInfo.terms_agreements);

        if (terms_agreements.length > 0) {
          window.account_terms_layer.open(authInfo.member_uuid, terms_agreements, authInfo);
        }
      });
  });
})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//



































;
/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */


(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute))
                        .on("error", function(){
                          var error =  $self.attr("data-error");

                          if($self.is("img")) {
                            $self.attr("src",error);
                          } else {
                            $self.css("background-image", "url('" + error + "')");
                          }
                        });
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
(function(){
	/**
	 * push_status_server 네임스페이스.
	 * @namespace push_status_server
	 */
	var push_status_server = {},
					OPEN_TYPE = "OPEN",
					CLOSE_TYPE = "CLOSE";

	/**
	 * 이벤트 리스트가 담기는 객체 리터럴
	 * @type {object}
	 */
	push_status_server.events = {};
	push_status_server.current_name = [];

	/**
	 * popstate 이벤트를 받아주는 메서드.
	 */
	push_status_server.init = function(){

		$(window).on('popstate', function(event){
			var last_layer_name = push_status_server.current_name.splice(push_status_server.current_name.length - 1, 1);

			var close_action = this.make_close_action(last_layer_name.toString());
			this.trigger_event(close_action);
//			var state = event.originalEvent.state;

//			if(state === null){
//				window.history.back();
//			} else {
//				console.dir(state);
//			}
		}.bind(this));
	};

	/**
	 * 이벤트를 등록하는 메서드.
	 * @param name - 이벤트 이름.
	 * @param openCallback - Open시 발생할 Callback 함수.
	 * @param closeCallback - Close시 발생시킬 Callback 함수.
	 */
	push_status_server.add_event = function(name, openCallback, closeCallback){
		this.events[name] = {
			"event_name": name,
			"openCallback": openCallback,
			"closeCallback": closeCallback
		};
	};

	/**
	 * action을 전달받아서 Type에 맞는 메서드를 실행해주는 메서드.
	 * @param action - 이벤트 Action
	 */
	push_status_server.trigger_event = function(action, params){
		var target_event = this.events[action.event_name];

		if (target_event){
			switch (action.type){
				case OPEN_TYPE:
					this.trigger_open(target_event, params);
					break;
				case CLOSE_TYPE:
					this.trigger_close(target_event, params);
					break;
			}
		}
	};

	/**
	 * 레이어 Open시 실행하는 메서드.
	 * @param target_event - 이벤트 Target Object.
	 */
	push_status_server.trigger_open = function(target_event, params){
		var new_url;
		target_event.openCallback.apply(null, params);

		new_url =  window.location.protocol + "//" + window.location.host + window.location.pathname + "#open";
		push_status_server.current_name.push(target_event.event_name);
		history.pushState(this.make_open_action(target_event.event_name), null, new_url);
	};

	/**
	 * 레이어 Close시 발생하는 메서드.
	 * @param target_event - 이벤트 Target Object.
	 */
	push_status_server.trigger_close = function(target_event, params){
		target_event.closeCallback.apply(null, params);
	};

	/**
	 * Open, Close 규약을 위해 action을 만들어주는 메서드.
	 * @param event_name - 이벤트 이름.
	 * @param type - 이벤트 타입.
	 * @returns {{type: string, event_name: string}}
	 */
	push_status_server.make_action = function(event_name, type){
		return {
			"type": type,
			"event_name": event_name
		}
	};

	/**
	 * Open시 전달할 action을 만들어주는 메서드.
	 * @param event_name - 이벤트 이름.
	 * @returns {{type, event_name} | {type: string, event_name: string}}
	 */
	push_status_server.make_open_action = function(event_name){
		var type = "OPEN";

		return this.make_action(event_name, type);
	};

	/**
	 * Close시 전달할 action을 만들어주는 메서드.
	 * @param event_name - 이벤트이름
	 * @returns {{type, event_name} | {type: string, event_name: string}}
	 */
	push_status_server.make_close_action = function(event_name){
		var type = "CLOSE";

		return this.make_action(event_name, type);
	};

	push_status_server.init();

	/**
	 * 전역객체에 바인딩.
	 */
	if (window.mp20){
		window.mp20.push_status_server = push_status_server;
	} else {
		window.mp20 = {};
		window.mp20.push_status_server = push_status_server;
	}
})();
(function(){
	var commoncode_service = {};

	commoncode_service.commoncode_data = [];
	commoncode_service.is_request = false;

	commoncode_service.get_commoncode = function(){
		var self = this;

		if(this.is_request){
			var temp_promise = new Promise(function(resolve, reject){
				var request_wating = setInterval(function(){
					if(commoncode_service.commoncode_data.length > 0){
						resolve(commoncode_service.commoncode_data);
						clearInterval(request_wating);
					}
				}, 50);
			});

			return temp_promise;
		}

		if(commoncode_service.commoncode_data.length > 0){
			var temp_promise = new Promise(function(resolve, reject){
				resolve(commoncode_service.commoncode_data);
			});

			return temp_promise;
		} else {
			this.is_request = true;
			return window.mp20.utils.HttpApi.getCommonCode().then(function (data) {
        commoncode_service.commoncode_data = data;
        return data;
      });
		}
	};

	commoncode_service.get_metro = function(metro_code){
    var commoncode_promise = this.get_commoncode();

    return commoncode_promise.then(function(commoncode){
      commoncode = JSON.parse(commoncode);

      metro_code = _.where(commoncode, {
        type_name: "metro_code",
        type_value: metro_code
      });

      if(metro_code.length){
        return metro_code[0];
      }
    });
	};

  commoncode_service.get_subcuisine = function(subcuisine_code){
    var commoncode_promise = this.get_commoncode();

    return commoncode_promise.then(function(commoncode){
      commoncode = JSON.parse(commoncode);

      subcuisine_code = _.where(commoncode, {
        type_name: "subcusine_code",
        type_value: subcuisine_code
      });

      if(subcuisine_code.length){
        return subcuisine_code[0];
      }
    });
  };

  commoncode_service.get_cuisine = function(cuisine_code){
    var commoncode_promise = this.get_commoncode();

    return commoncode_promise.then(function(commoncode){
      commoncode = JSON.parse(commoncode);

      cuisine_code = _.where(commoncode, {
        type_name: "cusine_code",
        type_value: cuisine_code
      });

      if(cuisine_code.length){
        return cuisine_code[0];
      }
    });
  };

  commoncode_service.get_price_range = function(price_range_code){
    var commoncode_promise = this.get_commoncode();

    return commoncode_promise.then(function(commoncode){
      commoncode = JSON.parse(commoncode);

      price_range_code = _.where(commoncode, {
        type_name: "price_range_code",
        type_value: price_range_code
      });

      if(price_range_code.length){
        return price_range_code[0];
      }
    });
  };

	var module = nameSpace("mp.module");
  module.commoncode_service = commoncode_service;
	window.commoncode_service = commoncode_service;
})();
(function () {
  var $document = $(document);

  $document.ready(function () {
    // image lazy load
    $(".lazy").lazyload({
      effect: "fadeIn",
      threshold: 150
    });

    Ellipsis({
      "class": ".ls-item .title",
      lines: 3
    });

    Ellipsis({
      "class": ".ls-item .desc",
      lines: 2,
    });

    try {
      var adm = AdManager.get_instance();
      AdRepeater.repeat(
        adm.repo.where({page: 'home', name: /card_list.*/}),
        $("section.module"),
        0,
        function (inventory, item, index) {
          adm.area_renderer.render(inventory, item, AdPlacer.after, index, 'card_list');
        }
      );
      adm.publish();
    }
    catch (e) {
      Sentry.captureException(e);
      console.error(e);
    }

    // home page event bind
    var $region_keywords = $(".subcuisine_keywords");
    var $metro_keywords = $(".metro_keywords");
    var $main_search = $(".main-search");
    var $window = $(window);
    var $search_button = $(".btn-search");
    var is_header_transparent_toggle = false;
    var scroll_event_list = [
      {
        "scroll_target": $(".popular_top_list_wrap"),
        "event_name": "SCROLL_TOPLIST",
        "target_position": "bottom",
        "is_tracking": false
      },
      {
        "scroll_target": $(".mp20_main_mango_pick_wrap"),
        "event_name": "SCROLL_MANGOPICK_LIST",
        "target_position": "bottom",
        "is_tracking": false
      },
      {
        "scroll_target": $(".main_popular_restaurant_wrap"),
        "event_name": "SCROLL_RESTAURANT",
        "target_position": "bottom",
        "is_tracking": false
      },
      {
        "scroll_target": $(".footer"),
        "event_name": "SCROLL_BOTTOM",
        "target_position": "top",
        "is_tracking": false
      }
    ];

    header_transparent_toggle();

    $window.on("scroll", _.throttle(home_scroll_event, 400));
    $window.on("resize", function () {
      header_transparent_toggle();
    });

    $search_button.on('click', function () {
      window.mp20.header.search();
    });

    function header_transparent_toggle() {
      var header = window.mp20.header;
      if (is_mobile_viewport()) {
        header.setNormalTheme();
        return;
      }

      var scrollTop = $window.scrollTop();
      if (scrollTop > $main_search.offset().top) {
        if (!is_header_transparent_toggle) {
          trackEvent("SCROLL_CLICK_SEARCH");
          is_header_transparent_toggle = true;
        }
        header.setNormalTheme();
      } else {
        header.setTransparentTheme();
      }
    }

    function home_scroll_event() {
      header_transparent_toggle();

      if (!scroll_event_list.length) {
        return;
      }

      _.each(scroll_event_list, function (item, index) {
        if (!item) {
          return false;
        }

        var target_scroll;
        var now_scroll = $window.scrollTop() + $window.height();

        if (item.target_position === "top") {
          target_scroll = item.scroll_target.offset().top;
        } else {
          target_scroll = item.scroll_target.offset().top + item.scroll_target.height();
        }

        if (now_scroll > target_scroll) {
          trackEvent(item.event_name);
          scroll_event_list.splice(index, 1);
        }
      });
    }
  });
})();





