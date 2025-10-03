var responseCodes = {};

responseCodes[(exports.CONTENT_TYPE_INVALID = 'content_type_invalid')] =
  'Content-Type must be of type application/json';
responseCodes[(exports.JSON_BODY_EXPECTED = 'json_body_expected')] = 'The request body is not a JSON object';
responseCodes[(exports.REQUEST_HEADER_MISSING = 'request_header_missing')] =
  'The request is missing the request header';
responseCodes[(exports.REQUEST_DETAILS_MISSING = 'request_details_missing')] =
  'The request is missing the request details';
responseCodes[(exports.REQUEST_ID_INVALID = 'request_id_invalid')] =
  'The request is either missing the request identifier or is not valid, only GUIDs are allowed';
responseCodes[(exports.INVALID_SIGNATURE = 'signature_invalid')] = 'Invalid request signature.';
responseCodes[(exports.SUCCESS_OK = 'OK')] = 'Request completed successfully';

responseCodes[(exports.EMAIL_REQUIRED = 'email_required')] = 'Please provide a valid email id';
responseCodes[(exports.INVALID_REQUEST = '0001')] = 'Error: Invalid request';
responseCodes[(exports.TECHNICAL_ISSUE = '0010')] = 'Error: Some technical issue. Please try again later';
responseCodes[(exports.EMAIL_ALREADY_EXISTS = '0011')] = 'Error: The provided email is already registered.';
responseCodes[(exports.EMAIL_NOT_EXIST = '0012')] = 'Error: The provided email does not exist.';
responseCodes[(exports.INVALID_CREDENTIALS = '0014')] = 'Error: Invalid credentials';
responseCodes[(exports.USER_PASSWORD_REQUIRED = '0037')] = 'Error: Password field is mandatory and must be provided.';
responseCodes[(exports.USER_PASSWORD_INVALID = '0038')] =
  'Error: The password must be at least 8 characters long and include one uppercase letter, one digit, and one special character.';
responseCodes[(exports.REQUEST_ID_REQUIRED = '1601')] = 'Error: Request id field is mandatory and must be provided.';
responseCodes[(exports.BRAND_NAME_REQUIRED = '1602')] = 'Error: Brand name field is mandatory and must be provided.';
responseCodes[(exports.EMAIL_ID_REQUIRED = '1603')] = 'Error: Email ID is required1';
responseCodes[(exports.VALID_EMAIL_ID = '1604')] = 'Error: Please provide a valid email id';
responseCodes[(exports.ALREADY_VERIFIED = '1605')] = 'Error: This user email already verified';
responseCodes[(exports.TOKEN_REQUIRED = '1606')] = 'Error: The token field is mandatory and must be provided.';
responseCodes[(exports.TOKEN_INVALID_OR_EXPIRED = '1607')] = 'Error: The token is invalid or expired';
responseCodes[(exports.EMAIL_NOT_VERIFIED = '1608')] = 'Error: The email is not verified';
responseCodes[(exports.INVALID_USER = '1609')] = 'Error: User is not exists.';
responseCodes[(exports.OLD_PASSWORD_REQUIRED = '1610')] =
  'Error: The old password field is mandetory and must be provided';
responseCodes[(exports.NEW_PASSWORD_REQUIRED = '1611')] =
  'Error: The new password field is mandetory and must be provided';
responseCodes[(exports.NEW_PASSWORD_INVALID = '1612')] =
  'Error: The password must be at least 8 characters long and include one uppercase letter, one digit, and one special character.';
responseCodes[(exports.CONFIRM_PASSWORD_REQUIRED = '1613')] =
  'Error: The confirm password field is mandetory and must be provided';
responseCodes[(exports.CONFIRM_PASSWORD_NOT_MATCH = '1614')] =
  'Error: The new password and confirm password are not match.';
responseCodes[(exports.OLD_PASSWORD_NOT_MATCH = '1615')] =
  'Error: The current password and old password are not match.';
responseCodes[(exports.PASSWORD_RESET_LINK = '1616')] = 'A password reset link is successfully sent on your email';
responseCodes[(exports.PASSWORD_UPDATE_SUCESS = '1617')] = 'Password updated successfully';
responseCodes[(exports.USER_FILE_NOT_FOUND = '1618')] = 'Error: The video field is mandetory and must be provided';
responseCodes[(exports.USER_FILE_UPLOAD_SUCCESS = '1619')] = 'File Uploaded Successfully';
responseCodes[(exports.INVALID_FILE_ID = '1620')] = 'Error: Invalid file details';
responseCodes[(exports.GET_FILE_DETAILS = '1621')] = 'Get file details successfully';
responseCodes[(exports.LOGIN_SUCCESS = '1622')] = 'Login successfully';
responseCodes[(exports.GET_FILE_LIST = '1623')] = 'Get file list successfully';
responseCodes[(exports.NAME_REQUIRED = '1624')] = 'Error: The name field is mandetory and must be provided';
responseCodes[(exports.API_KEY_NOT_FOUND = '1625')] = 'Error: The api key field is mandetory and must be provided';
responseCodes[(exports.INVALIDY_API_KEY = '1626')] = 'Error: The api key is invalid';
responseCodes[(exports.CONDITION_REQUIRED = '1627')] = 'Error: The condition field is mandetory and must be provided';
responseCodes[(exports.FEES_REQUIRED = '1628')] = 'Error: The fees field is mandetory and must be provided';
responseCodes[(exports.TIME_REQUIRED = '1629')] = 'Error: The time field is mandetory and must be provided';
responseCodes[(exports.DETAILS_REQUIRED = '1630')] = 'Error: The details field is mandetory and must be provided';
responseCodes[(exports.INVALID_PAYMENT_METHOD = '1631')] = 'Error: Invalid payment method';
responseCodes[(exports.AMOUNT_REQUIRED = '1632')] = 'Error: The amount field is mandetory and must be provided';
responseCodes[(exports.BANK_DETAILS_REQUIRED = '1633')] = 'Please Enter First Bank Details before You can Withdraw';
responseCodes[(exports.MIN_AMOUNT_REQUIRED = '1634')] = 'Please Enter Amount Grater than ';
responseCodes[(exports.AVAILABLE_AMOUNT_REQUIRED = '1635')] = 'Error: You can Withdraw available amount';
responseCodes[(exports.WITHDRAWAL_NOT_ALLOWED = '1636')] = 'Error: You can not Withdraw';
responseCodes[(exports.LINKS_REQUIRED = '1637')] = 'Error: The links field is mandetory and must be provided';
responseCodes[(exports.STATUS_REQUIRED = '1638')] = 'Error: The status field is mandetory and must be provided';
responseCodes[(exports.INVALID_STATUS = '1639')] = 'Error: The status is invalid';
responseCodes[(exports.BANK_DETAILS_PENDING = '1640')] = 'Error: bank details request is pending';
responseCodes[(exports.BANK_DETAILS_REJECTED = '1641')] = 'Error: bank details request is rejected';
responseCodes[(exports.SITE_NAME_REQUIRED = '1642')] = 'Error: The site_name field is mandetory and must be provided';
responseCodes[(exports.TELEGRAM_CHANNEL_LINK_REQUIRED = '1643')] =
  'Error: The Telegram Channel Link field is mandetory and must be provided';
responseCodes[(exports.TELEGRAM_SUPPORT_LINK_REQUIRED = '1644')] =
  'Error: The Telegram Support Channel Link field is mandetory and must be provided';
responseCodes[(exports.USER_LINK_BOT_LINK_REQUIRED = '1645')] =
  'Error: The User Link Bot Link field is mandetory and must be provided';
responseCodes[(exports.FILE_UPLOADER_BOT_LINK_REQUIRED = '1646')] =
  'Error: The File Uploader Bot Link field is mandetory and must be provided';
responseCodes[(exports.LINK_CONVERTER_BOT_LINK_REQUIRED = '1647')] =
  'Error: The Link Converter Bot Link field is mandetory and must be provided';
responseCodes[(exports.INVALID_LINK = '1648')] = 'Error: Enter Valid Link';
responseCodes[(exports.PRICE_PER_VIEW_REQUIRED = '1649')] =
  'Error: The Price Per View field is mandetory and must be provided';
responseCodes[(exports.DATE_REQUIRED = '1650')] = 'Error: The date field is mandetory and must be provided';
responseCodes[(exports.INVALID_DATE_FORMAT = '1651')] = 'Error: Invalid date format';
responseCodes[(exports.MONTH_NAME_REQUIRED = '1652')] = 'Error: The month name field is mandetory and must be provided';
responseCodes[(exports.YEAR_REQUIRED = '1653')] = 'Error: The year field is mandetory and must be provided';
responseCodes[(exports.INVALID_MONTH_YEAR = '1654')] = 'Error: Invalid month name or year';
responseCodes[(exports.PLAY_STORE_LINK_REQUIRED = '1655')] =
  'Error: The play store link field is mandetory and must be provided';
responseCodes[(exports.APP_STORE_LINK_REQUIRED = '1656')] =
  'Error: The app store link field is mandetory and must be provided';
responseCodes[(exports.YOUTUBE_LINK_REQUIRED = '1657')] =
  'Error: The youtube link field is mandetory and must be provided';
responseCodes[(exports.SUBJECT_REQUIRED = '1658')] = 'Error: The subject field is mandetory and must be provided';
responseCodes[(exports.MESSAGE_REQUIRED = '1659')] = 'Error: The message field is mandetory and must be provided';
responseCodes[(exports.PAID_STATUS = '1660')] = 'Error: First approved the Payment then you can assign as paid';
responseCodes[(exports.STATUS_NOT_CHANGED = '1661')] =
  'Error: Once status is Paid, Returned or Cancelled then status not changed';
responseCodes[(exports.REASON_REQUIRED = '1662')] = 'Error: The reason field is mandetory and must be provided';
responseCodes[(exports.LINK_REQUIRED = '1663')] = 'Error: The link field is mandetory and must be provided';
responseCodes[(exports.IMAGE_NOT_FOUND = '1664')] = 'Error: The image field is mandetory and must be provided';
responseCodes[(exports.GET_CRICKET_LINKS = '1665')] = 'Get links details successfully';
responseCodes[(exports.ORDER_ID_REQUIRED = '1666')] = 'Error: The order id field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_ID_REQUIRED = '1667')] = 'Error: The payment id field is mandetory and must be provided';
responseCodes[(exports.SIGNATURE_REQUIRED = '1668')] = 'Error: The signature field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_INTENT_ID_REQUIRED = '1667')] =
  'Error: The payment intent id field is mandetory and must be provided';

// Admins
responseCodes[(exports.DAILY_WATCH_ADS_FOR_COIN_REQUIRED = '2001')] =
  'Error: The daily watch ads for coin field is mandetory and must be provided';
responseCodes[(exports.WATCH_ADS_FOR_EPISODE_REQUIRED = '2002')] =
  'Error: The watch ads for episode field is mandetory and must be provided';
responseCodes[(exports.TIME_AFTER_WATCH_ADS_REQUIRED = '2003')] =
  'Error: The time after watch ads field is mandetory and must be provided';
responseCodes[(exports.PER_EPISODE_COIN_REQUIRED = '2004')] =
  'Error: The per episode coin field is mandetory and must be provided';
responseCodes[(exports.DAY_ONE_COIN_REQUIRED = '2005')] =
  'Error: The day one coin field is mandetory and must be provided';
responseCodes[(exports.DAY_TWO_COIN_REQUIRED = '2006')] =
  'Error: The day two coin field is mandetory and must be provided';
responseCodes[(exports.DAY_THREE_COIN_REQUIRED = '2007')] =
  'Error: The day three coin field is mandetory and must be provided';
responseCodes[(exports.DAY_FOUR_COIN_REQUIRED = '2008')] =
  'Error: The day four coin field is mandetory and must be provided';
responseCodes[(exports.DAY_FIVE_COIN_REQUIRED = '2009')] =
  'Error: The day five coin field is mandetory and must be provided';
responseCodes[(exports.DAY_SIX_COIN_REQUIRED = '2010')] =
  'Error: The day six coin field is mandetory and must be provided';
responseCodes[(exports.DAY_SEVEN_COIN_REQUIRED = '2011')] =
  'Error: The day seven coin field is mandetory and must be provided';
responseCodes[(exports.BIND_EMAIL_COIN_REQUIRED = '2012')] =
  'Error: The bind email coin field is mandetory and must be provided';
responseCodes[(exports.LINK_WHATSAPP_COIN_REQUIRED = '2013')] =
  'Error: The link whatsapp coin field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_FACEBOOK_COIN_REQUIRED = '2014')] =
  'Error: The follow us on facebook coin field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_YOUTUBE_COIN_REQUIRED = '2015')] =
  'Error: The follow us on youtube coin field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_INSTAGRAM_COIN_REQUIRED = '2016')] =
  'Error: The follow us on instagram coin field is mandetory and must be provided';
responseCodes[(exports.CATEGORY_NAME_REQUIRED = '2017')] =
  'Error: The category name field is mandetory and must be provided';
responseCodes[(exports.CATEGORY_ID_REQUIRED = '2018')] =
  'Error: The category id field is mandetory and must be provided';
responseCodes[(exports.INVALID_CATEGORY = '2019')] = 'Error: Invalid category id. Please send valid category id';
responseCodes[(exports.LANGUAGE_NAME_REQUIRED = '2020')] =
  'Error: The language name field is mandetory and must be provided';
responseCodes[(exports.LANGUAGE_ID_REQUIRED = '2021')] =
  'Error: The language id field is mandetory and must be provided';
responseCodes[(exports.INVALID_LANGUAGE = '2022')] = 'Error: Invalid language id. Please send valid language id';
responseCodes[(exports.TAG_NAME_REQUIRED = '2023')] = 'Error: The tag name field is mandetory and must be provided';
responseCodes[(exports.INVALID_TAG = '2024')] = 'Error: Invalid tag id. Please send valid tag id';
responseCodes[(exports.TAG_ID_REQUIRED = '2025')] = 'Error: The tag id field is mandetory and must be provided';
responseCodes[(exports.TYPE_NAME_REQUIRED = '2026')] = 'Error: The type name field is mandetory and must be provided';
responseCodes[(exports.TYPE_IMAGE_NOT_FOUND = '2027')] =
  'Error: The type image field is mandetory and must be provided';
responseCodes[(exports.TYPE_ID_REQUIRED = '2028')] = 'Error: The type id field is mandetory and must be provided';
responseCodes[(exports.INVALID_TYPE = '2029')] = 'Error: Invalid type id. Please send valid type id';
responseCodes[(exports.PAYMENT_METHOD_NAME_REQUIRED = '2030')] =
  'Error: The payment method name field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_METHOD_API_KEY_REQUIRED = '2031')] =
  'Error: The payment method api id field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_METHOD_API_KEY_TEST_REQUIRED = '2032')] =
  'Error: The payment method api key field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_METHOD_API_KEY_LIVE_REQUIRED = '2033')] =
  'Error: The payment method api key live field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_METHOD_ID_REQUIRED = '2033')] =
  'Error: The payment method id field is mandetory and must be provided';
responseCodes[(exports.INVALID_PAYMENT_METHOD = '2034')] =
  'Error: Invalid payment method id. Please send valid payment method id';
responseCodes[(exports.FILES_MISSING = '2035')] = 'Error: Thumbnail, poster and cover video are required';
responseCodes[(exports.INVALID_THUMBNAIL_IMAGE = '2036')] =
  'Error: Thumbnail must be a valid image (JPG, PNG, GIF, etc.)';
responseCodes[(exports.INVALID_COVER_VIDEO = '2037')] =
  'Error: Cover video must be a valid video file (MP4, AVI, MOV, etc.)';
responseCodes[(exports.SERIES_TITLE_REQUIRED = '2038')] =
  'Error: The series title field is mandetory and must be provided';
responseCodes[(exports.SERIES_TAG_ID_REQUIRED = '2039')] =
  'Error: The series tag id field is mandetory and must be provided';
responseCodes[(exports.SERIES_TOTAL_EPISODE_REQUIRED = '2040')] =
  'Error: The series total episode field is mandetory and must be provided';
responseCodes[(exports.SERIES_FREE_EPISODE_REQUIRED = '2041')] =
  'Error: The series free episode field is mandetory and must be provided';
responseCodes[(exports.SERIES_IS_FREE_REQUIRED = '2042')] =
  'Error: The series is free field is mandetory and must be provided';
responseCodes[(exports.SERIES_IS_RECOMMENDED_REQUIRED = '2043')] =
  'Error: The series is recommended field is mandetory and must be provided';
responseCodes[(exports.SERIES_ID_REQUIRED = '2044')] = 'Error: The series id field is mandetory and must be provided';
responseCodes[(exports.INVALID_SERIES = '2045')] = 'Error: Invalid series id. Please send valid series id';
responseCodes[(exports.EPISODE_VIDEO_NOT_FOUND = '2046')] =
  'Error: The episode video field is mandetory and must be provided';
responseCodes[(exports.EPISODE_NUMBER_REQUIRED = '2047')] =
  'Error: The episode number field is mandetory and must be provided';
responseCodes[(exports.EPISODE_ID_REQUIRED = '2048')] = 'Error: The episode id field is mandetory and must be provided';
responseCodes[(exports.INVALID_EPISODE = '2049')] = 'Error: Invalid episode id. Please send valid episode id';
responseCodes[(exports.DAILY_WATCH_ADS_FOR_MINIMUM_COIN_REQUIRED = '2050')] =
  'Error: The daily watch ads for minimum coin field is mandetory and must be provided';
responseCodes[(exports.DAILY_WATCH_ADS_FOR_MAXIMUM_COIN_REQUIRED = '2051')] =
  'Error: The daily watch ads for maximum coin field is mandetory and must be provided';
responseCodes[(exports.EXTRA_DAILY_REQUIRED = '2052')] =
  'Error: The extra daily field is mandetory and must be provided';
responseCodes[(exports.INVALID_PLAN = '2053')] = 'Error: Invalid plan id. Please send valid pan id';
responseCodes[(exports.PLAN_ID_REQUIRED = '2054')] = 'Error: The plan id field is mandetory and must be provided';
responseCodes[(exports.SERIES_DESCRIPTION_REQUIRED = '2055')] =
  'Error: The series description field is mandetory and must be provided';
responseCodes[(exports.SERIES_CATEGORY_ID_REQUIRED = '2056')] =
  'Error: The series category id field is mandetory and must be provided';
responseCodes[(exports.LOGIN_REWARD_COIN_REQUIRED = '2057')] =
  'Error: The login reward coin field is mandetory and must be provided';
responseCodes[(exports.TURN_ON_NOTIFICATION_COIN_REQUIRED = '2058')] =
  'Error: The turn on notification coin field is mandetory and must be provided';
responseCodes[(exports.PAYMENT_METHOD_ACTIVE_REQUIRED = '2059')] =
  'Error: The payment method is active field is mandetory and must be provided';
responseCodes[(exports.EPISODE_TITLE_REQUIRED = '2060')] =
  'Error: The episode title field is mandetory and must be provided';
responseCodes[(exports.EPISODE_DESCRIPTION_REQUIRED = '2061')] =
  'Error: The episode description field is mandetory and must be provided';
responseCodes[(exports.EPISODE_TAGS_REQUIRED = '2062')] =
  'Error: The episode tags field is mandetory and must be provided';
responseCodes[(exports.SERIES_IS_ACTIVE_REQUIRED = '2063')] =
  'Error: The series is active field is mandetory and must be provided';
responseCodes[(exports.TIME_AFTER_WATCH_DAILY_ADS_REQUIRED = '2064')] =
  'Error: The time after watch daily ads field is mandetory and must be provided';
responseCodes[(exports.TIME_BETWEEN_DAILY_ADS_REQUIRED = '2065')] =
  'Error: The time between daily ads field is mandetory and must be provided';
responseCodes[(exports.NOTIFICATION_TITLE_REQUIRED = '2066')] =
  'Error: The notification title field is mandetory and must be provided';
responseCodes[(exports.NOTIFICATION_MESSAGE_REQUIRED = '2067')] =
  'Error: The notification message field is mandetory and must be provided';
responseCodes[(exports.NOTIFICATION_IMAGE_NOT_FOUND = '2068')] =
  'Error: The notification image field is mandetory and must be provided';

// Users
responseCodes[(exports.LOGIN_TYPE_REQUIRED = '3001')] = 'Error: The login type field is mandetory and must be provided';
responseCodes[(exports.INVALID_LOGIN_TYPE = '3002')] = 'Error: Please provide valid login type';
responseCodes[(exports.LOGIN_TYPE_ID_REQUIRED = '3003')] =
  'Error: The login type id field is mandetory and must be provided';
responseCodes[(exports.NAME_REQUIRED = '3004')] = 'Error: The name field is mandetory and must be provided';
responseCodes[(exports.USER_ID_REQUIRED = '3005')] = 'Error: The user id field is mandetory and must be provided';
responseCodes[(exports.INVALID_USER = '3006')] = 'Error: Please provide valid user id';
responseCodes[(exports.COINS_REQUIRED = '3007')] = 'Error: The coins field is mandetory and must be provided';
responseCodes[(exports.DAY_REQUIRED = '3008')] = 'Error: The day field is mandetory and must be provided';
responseCodes[(exports.YOU_ALREADY_CHECKED_IN = '3009')] = 'Error: You already checked in for today';
responseCodes[(exports.YOU_WATCHED_MAXIMUM_ADS = '3010')] = 'Error: You already watched maximum ads for today';
responseCodes[(exports.YOU_ALREADY_WATCHED = '3011')] = 'Error: You already watched ads for today';
responseCodes[(exports.TRANSACTION_KEY_REQUIRED = '3012')] =
  'Error: The transaction key field is mandetory and must be provided';
responseCodes[(exports.TRANSACTION_ID_REQUIRED = '3013')] =
  'Error: The transaction id field is mandetory and must be provided';
responseCodes[(exports.INVALID_TRANSACTION_ID = '3014')] =
  'Error: Transaction id is invalid. Please provide valid transaction id';
responseCodes[(exports.TRANSACTION_ALREADY_UPDATED = '3015')] = 'Error: Transaction already updated';
responseCodes[(exports.UNLOCK_NEW_EPISODE = '3016')] = 'Error: Please first buy coin for unlock episodes';
responseCodes[(exports.IS_ADS_REQUIRED = '3017')] = 'Error: The is ads field is mandetory and must be provided';
responseCodes[(exports.ALREADY_UNLOCKED_EPISODE = '3018')] = 'Error: Already unlocked this episode';
responseCodes[(exports.IS_AUTO_UNLOCKED_REQUIRED = '3019')] =
  'Error: The is auto unlocked field is mandetory and must be provided';
responseCodes[(exports.IS_LIKED_REQUIRED = '3020')] = 'Error: The is liked field is mandetory and must be provided';
responseCodes[(exports.REWARD_TYPE_REQUIRED = '3021')] =
  'Error: The reward type field is mandetory and must be provided';
responseCodes[(exports.INVALID_REWARD_TYPE = '3022')] = 'Error: Invalid reward type. please provide valid reward type';
responseCodes[(exports.YOU_ALREADY_REWARDED = '3023')] = 'Error: You already rewarded for that';
responseCodes[(exports.YOU_ALREADY_BINDED = '3024')] = 'Error: You already binded you email';
responseCodes[(exports.ACCOUNT_ALREADY_DELETED = '3025')] = 'Error: Your account is already deleted';
responseCodes[(exports.ACCOUNT_HAS_BEEN_DELETED = '3026')] =
  'Error: Your account has been deleted. Please contact administrator.';
responseCodes[(exports.OFFICIAL_WEBSITE_REQUIRED = '3027')] =
  'Error: The official website field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_INSTAGRAM_REQUIRED = '3028')] =
  'Error: The follow us on instagram field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_FACEBOOK_REQUIRED = '3029')] =
  'Error: The follow us on facebook field is mandetory and must be provided';
responseCodes[(exports.ABOUT_US_REQUIRED = '3030')] = 'Error: The about us field is mandetory and must be provided';
responseCodes[(exports.TERMS_CONDITION_REQUIRED = '3031')] =
  'Error: The terms and condition field is mandetory and must be provided';
responseCodes[(exports.PRIVACY_POLICY_REQUIRED = '3032')] =
  'Error: The privacy and policy field is mandetory and must be provided';
responseCodes[(exports.INVALID_ADVERTISEMENT_ID = '3033')] =
  'Error: Invalid advertise platform id. please provide valid advertise platform id';
responseCodes[(exports.ADVERTISEMENT_ID_REQUIRED = '3034')] =
  'Error: The advertisement id field is mandetory and must be provided';
responseCodes[(exports.ADS_PLATFORM_NAME_REQUIRED = '3035')] =
  'Error: The advertisement platform name field is mandetory and must be provided';
responseCodes[(exports.ADS_PLATFORM_STATUS_REQUIRED = '3036')] =
  'Error: The advertisement platform status field is mandetory and must be provided';
responseCodes[(exports.INVALID_POSTER_IMAGE = '3037')] = 'Error: Poster must be a valid image (JPG, PNG, GIF, etc.)';
responseCodes[(exports.USER_IS_BLOCKED_REQUIRED = '3038')] =
  'Error: The is blocked field is mandetory and must be provided';
responseCodes[(exports.PLAN_IS_ACTIVE_REQUIRED = '3039')] =
  'Error: The is active field is mandetory and must be provided';
responseCodes[(exports.PLAN_ID_REQUIRED = '3040')] = 'Error: The plan id field is mandetory and must be provided';
responseCodes[(exports.SITE_TITLE_REQUIRED = '3041')] = 'Error: The site title field is mandetory and must be provided';
responseCodes[(exports.REASON_TITLE_REQUIRED = '3042')] =
  'Error: The reason title field is mandetory and must be provided';
responseCodes[(exports.INVALID_REPORT_REASON = '3043')] =
  'Error: Invalid report reason id. please provide valid report reason id';
responseCodes[(exports.REASON_ID_REQUIRED = '3044')] = 'Error: The reason id field is mandetory and must be provided';
responseCodes[(exports.YOUR_QUERY_IS_IN_PROGRESS = '3045')] = 'Error: Your query is in progress. Please wait for while';
responseCodes[(exports.INVALID_TICKET_ID = '3046')] = 'Error: Invalid ticket id. please provide valid ticket id';
responseCodes[(exports.TICKET_ID_REQUIRED = '3047')] = 'Error: The ticket id field is mandetory and must be provided';
responseCodes[(exports.TICKET_STATUS_REQUIRED = '3048')] =
  'Error: The ticket status field is mandetory and must be provided';
responseCodes[(exports.INVALID_TICKET_STATUS = '3049')] =
  'Error: Invalid ticket status. please provide valid ticket status';
responseCodes[(exports.QUESTION_REQUIRED = '3050')] = 'Error: The question field is mandetory and must be provided';
responseCodes[(exports.ANSWER_REQUIRED = '3050')] = 'Error: The answer field is mandetory and must be provided';
responseCodes[(exports.INVALID_FAQ = '3051')] = 'Error: Invalid faq id. please provide valid faq id';
responseCodes[(exports.FAQ_ID_REQUIRED = '3052')] = 'Error: The faq id field is mandetory and must be provided';
responseCodes[(exports.COPYRIGHT_TEXT_REQUIRED = '3053')] =
  'Error: The copyright text field is mandetory and must be provided';
responseCodes[(exports.DEVICE_ID_REQUIRED = '3054')] = 'Error: The device id field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_YOUTUBE_REQUIRED = '3055')] =
  'Error: The follow us on youtube field is mandetory and must be provided';
responseCodes[(exports.USERNAME_REQUIRED = '3056')] = 'Error: The username field is mandetory and must be provided';
responseCodes[(exports.CODE_REQUIRED = '3057')] = 'Error: The code field is mandetory and must be provided';
responseCodes[(exports.ID_REQUIRED = '3058')] = 'Error: The id field is mandetory and must be provided';
responseCodes[(exports.INVALID_TYPE = '3059')] = 'Error: Please provide valid type';
responseCodes[(exports.LICENSE_ALREADY_VERIFIED = '3060')] = 'Error: The provided license is already verified.';
responseCodes[(exports.LICENSE_NOT_VERIFIED = '3061')] = 'Error: The provided license is not verified.';
responseCodes[(exports.REFERER_REQUIRED = '3062')] = 'Error: The referer field is mandetory and must be provided';
responseCodes[(exports.FOLLOW_US_ON_WHATSAPP_CHANNEL_REQUIRED = '3063')] =
  'Error: The follow us on whatsapp channel field is mandetory and must be provided';
responseCodes[(exports.INVALID_EPISODE_NUMBER = '3064')] = 'Error: Please provide numeric episode number.';
responseCodes[(exports.DUPLICATE_EPISODE_NUMBER = '3065')] = 'Error: Duplicate episode_number for this series.';

exports.getStatusText = function (responseCode) {
  if (responseCodes.hasOwnProperty(responseCode)) {
    return responseCodes[responseCode];
  } else {
    return 'undefined code: ' + responseCode;
  }
};
