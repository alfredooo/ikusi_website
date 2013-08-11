class LenguagesController < ApplicationController
  # GET /lenguages
  # GET /lenguages.json
  def index
    @lenguages = Lenguage.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @lenguages }
    end
  end

  # GET /lenguages/1
  # GET /lenguages/1.json
  def show
    @lenguage = Lenguage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @lenguage }
    end
  end

  # GET /lenguages/new
  # GET /lenguages/new.json
  def new
    @lenguage = Lenguage.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @lenguage }
    end
  end

  # GET /lenguages/1/edit
  def edit
    @lenguage = Lenguage.find(params[:id])
  end

  # POST /lenguages
  # POST /lenguages.json
  def create
    @lenguage = Lenguage.new(params[:lenguage])

    respond_to do |format|
      if @lenguage.save
        format.html { redirect_to @lenguage, notice: 'Lenguage was successfully created.' }
        format.json { render json: @lenguage, status: :created, location: @lenguage }
      else
        format.html { render action: "new" }
        format.json { render json: @lenguage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /lenguages/1
  # PUT /lenguages/1.json
  def update
    @lenguage = Lenguage.find(params[:id])

    respond_to do |format|
      if @lenguage.update_attributes(params[:lenguage])
        format.html { redirect_to @lenguage, notice: 'Lenguage was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @lenguage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lenguages/1
  # DELETE /lenguages/1.json
  def destroy
    @lenguage = Lenguage.find(params[:id])
    @lenguage.destroy

    respond_to do |format|
      format.html { redirect_to lenguages_url }
      format.json { head :no_content }
    end
  end
end
