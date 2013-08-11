require 'test_helper'

class HomeConfigurationsControllerTest < ActionController::TestCase
  setup do
    @home_configuration = home_configurations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:home_configurations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create home_configuration" do
    assert_difference('HomeConfiguration.count') do
      post :create, home_configuration: { main_history: @home_configuration.main_history }
    end

    assert_redirected_to home_configuration_path(assigns(:home_configuration))
  end

  test "should show home_configuration" do
    get :show, id: @home_configuration
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @home_configuration
    assert_response :success
  end

  test "should update home_configuration" do
    put :update, id: @home_configuration, home_configuration: { main_history: @home_configuration.main_history }
    assert_redirected_to home_configuration_path(assigns(:home_configuration))
  end

  test "should destroy home_configuration" do
    assert_difference('HomeConfiguration.count', -1) do
      delete :destroy, id: @home_configuration
    end

    assert_redirected_to home_configurations_path
  end
end
