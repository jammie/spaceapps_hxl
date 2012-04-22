class ExportsController < ApplicationController
  def home;end
  
  def excel;end
  
  def webservice;end
  
  def create
    #if params[:user][:name].blank? and params[:organization][:name].blank?
    if params[:project][:name].blank?
      flash[:notice] = "Please input your project name"
      redirect_to root_path and return
    end
    if params[:data].blank?
      flash[:notice] = "Don't forget to include your file."
      redirect_to root_path and return
    end
    
    #current_user = User.creating(params[:user][:name], params[:organization][:name], params[:data])
    project = Project.create({ :name => params[:project][:name]})
    project.assets.create({:data => params[:data]})
        
    redirect_to export_path({:project_id => project.id})
  end
  
  def show
    @project = Project.find_by_id(params[:project_id]||params[:id])
  end
  
  def excel_parsing
    project = Project.find_by_id(params[:project_id])
    
  end
end
