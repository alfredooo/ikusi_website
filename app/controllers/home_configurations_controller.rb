class HomeConfigurationsController < ApplicationController
  # GET /home_configurations
  # GET /home_configurations.json
  def index
    @home_configurations = HomeConfiguration.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @home_configurations }
    end
  end

  # GET /home_configurations/1
  # GET /home_configurations/1.json
  def show
    @home_configuration = HomeConfiguration.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @home_configuration }
    end
  end

  # GET /home_configurations/new
  # GET /home_configurations/new.json
  def new
    @home_configuration = HomeConfiguration.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @home_configuration }
    end
  end

  # GET /home_configurations/1/edit
  def edit
    @home_configuration = HomeConfiguration.find(params[:id])
  end

  # POST /home_configurations
  # POST /home_configurations.json
  def create
    @home_configuration = HomeConfiguration.new(params[:home_configuration])

    respond_to do |format|
      if @home_configuration.save
        format.html { redirect_to @home_configuration, notice: 'Home configuration was successfully created.' }
        format.json { render json: @home_configuration, status: :created, location: @home_configuration }
      else
        format.html { render action: "new" }
        format.json { render json: @home_configuration.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /home_configurations/1
  # PUT /home_configurations/1.json
  def update
    @home_configuration = HomeConfiguration.find(params[:id])

    respond_to do |format|
      if @home_configuration.update_attributes(params[:home_configuration])
        format.html { redirect_to @home_configuration, notice: 'Home configuration was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @home_configuration.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /home_configurations/1
  # DELETE /home_configurations/1.json
  def destroy
    @home_configuration = HomeConfiguration.find(params[:id])
    @home_configuration.destroy

    respond_to do |format|
      format.html { redirect_to home_configurations_url }
      format.json { head :no_content }
    end
  end
end
