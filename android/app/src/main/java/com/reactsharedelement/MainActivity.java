package com.reactsharedelement;

import com.affirm.android.Affirm;
import com.affirm.android.model.Checkout;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class MainActivity extends ReactActivity implements Affirm.CheckoutCallbacks {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactsharedelement";
  }

  public static Callback affirmCallback;

  public static void beginCheckout (Activity activity, Checkout checkout) {
    Affirm.startCheckout(activity, checkout, false);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (Affirm.handleCheckoutData(this, requestCode, resultCode, data)) {
      return;
    }

    super.onActivityResult(requestCode, resultCode, data);
  }

  @Override
  public void onAffirmCheckoutError(@Nullable String message) {
    System.out.println(message);
    affirmCallback.invoke(message, null);
  }

  @Override
  public void onAffirmCheckoutCancelled() {
    System.out.println("cancelled");
    affirmCallback.invoke("cancelled", null);
  }

  @Override
  public void onAffirmCheckoutSuccess(@NonNull String token) {
    affirmCallback.invoke(null, token);
  }
}
