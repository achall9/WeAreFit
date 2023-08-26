package com.reactsharedelement;

import com.affirm.android.Affirm;
import com.affirm.android.model.Address;
import com.affirm.android.model.Billing;
import com.affirm.android.model.Checkout;
import com.affirm.android.model.Item;
import com.affirm.android.model.Name;
import com.affirm.android.model.Shipping;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class AffirmModule extends ReactContextBaseJavaModule {
    // constructor
    public AffirmModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "AffirmModule";
    }

    @ReactMethod
    public void initialize(ReadableMap options, Callback callback) {
        String publicKey = options.getString("publicKey");
        String env = options.getString("env");
        String merchantName = options.getString("merchantName");
        String locale = options.getString("locale");

        Affirm.initialize(new Affirm.Configuration.Builder(publicKey)
                .setEnvironment(env.equals("production") ? Affirm.Environment.PRODUCTION : Affirm.Environment.SANDBOX)
                .setReceiveReasonCodes("true")
                .setMerchantName(merchantName)
                .setLogLevel(Affirm.LOG_LEVEL_DEBUG)
                .setCheckoutRequestCode(8001)
                .setLocation(locale.equals("CA") ? Affirm.Location.CA : Affirm.Location.US) // "CA" for Canadian, "US" for
                                                                                       // American (If not set, default
                                                                                       // use US)
                .build());
    }

    // Render Affirm Checkout
    @ReactMethod
    public void showAffirm(ReadableMap checkoutOptions, Callback callback) {
        // misc
        String mode = checkoutOptions.getMap("metadata").getString("mode");
        double totalUSD = checkoutOptions.getDouble("totalUSD");

        // Shipping
        ReadableMap shippingMap = checkoutOptions.getMap("shipping");

        double shippingTotalCents = shippingMap.getDouble("shippingTotalCents");

        String firstName = shippingMap.getMap("name").getString("first");
        String lastName = shippingMap.getMap("name").getString("last");
        String email = shippingMap.getString("email");
        String phone = shippingMap.getString("phoneNumber");
        String street1 = shippingMap.getMap("address").getString("line1");
        String street2 = shippingMap.getMap("address").getString("line2");
        String city = shippingMap.getMap("address").getString("city");
        String state = shippingMap.getMap("address").getString("state");
        String zipCode = shippingMap.getMap("address").getString("zipCode");
        String country = shippingMap.getMap("address").getString("country");

        // More details on
        // https://docs.affirm.com/affirm-developers/reference/the-metadata-object
        final Map<String, String> metadata = new HashMap<>();
        metadata.put("mode", mode);

        String fullName = firstName + " " + lastName;
        final Name name = Name.builder().setFull(fullName).build();

        // In US, use Address
        final Address address = Address.builder()
                .setCity(city)
                .setCountry(country)
                .setLine1(street1)
                .setLine2(street2)
                .setState(state)
                .setZipcode(zipCode)
                .build();

        final Shipping shipping = Shipping.builder().setAddress(address).setName(name).setEmail(email)
                .setPhoneNumber(phone).build();
        final Billing billing = Billing.builder().setAddress(address).setName(name).setEmail(email)
                .setPhoneNumber(phone).build();

        final Map<String, Item> items = new HashMap<>();

        ArrayList<Object> itemsList = checkoutOptions.getArray("items").toArrayList();
        for (int i = 0; i < itemsList.size(); i++) {
            HashMap itemMap = (HashMap) itemsList.get(i);
            String displayName = itemMap.get("displayName").toString();
            String url = itemMap.get("url").toString();
            double quantity = (Double) itemMap.get("quantity");
            int qty = (int) quantity;
            String sku = itemMap.get("sku").toString();
            double unitPriceDollars = (Double) itemMap.get("unitPriceDollars");
            final Item item = Item.builder()
                    .setDisplayName(displayName)
                    .setImageUrl("")
                    .setQty(qty)
                    .setSku(sku)
                    .setUnitPrice(BigDecimal.valueOf(unitPriceDollars))
                    .setUrl(url)
                    .build();

            items.put("ticket" + i, item);
        }

        final Checkout checkout = Checkout.builder()
                .setOrderId("")
                .setItems(items)
                .setBilling(billing)
                .setShipping(shipping)
                .setShippingAmount(BigDecimal.valueOf(shippingTotalCents / 100))
                .setTaxAmount(BigDecimal.valueOf(0.0))
                .setTotal(BigDecimal.valueOf(totalUSD))
                .setMetadata(metadata)
                .build();

        MainActivity.affirmCallback = callback;
        MainActivity.beginCheckout(getCurrentActivity(), checkout);

    }
}