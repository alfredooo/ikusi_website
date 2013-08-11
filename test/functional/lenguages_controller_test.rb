require 'test_helper'

class LenguagesControllerTest < ActionController::TestCase
  setup do
    @lenguage = lenguages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lenguages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lenguage" do
    assert_difference('Lenguage.count') do
      post :create, lenguage: { name: @lenguage.name }
    end

    assert_redirected_to lenguage_path(assigns(:lenguage))
  end

  test "should show lenguage" do
    get :show, id: @lenguage
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lenguage
    assert_response :success
  end

  test "should update lenguage" do
    put :update, id: @lenguage, lenguage: { name: @lenguage.name }
    assert_redirected_to lenguage_path(assigns(:lenguage))
  end

  test "should destroy lenguage" do
    assert_difference('Lenguage.count', -1) do
      delete :destroy, id: @lenguage
    end

    assert_redirected_to lenguages_path
  end
end
