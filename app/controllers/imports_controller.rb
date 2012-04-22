class ImportsController < ApplicationController
  def excel;end
  
  def parsed_excel
    #!need to refactor the code
    @project = Project.find_by_name(params["data"].original_filename) || Project.create({:name => params["data"].original_filename})
    @asset = Asset.find_by_data_file_name(params["data"].original_filename) || Asset.create({:data => params["data"], :project_id => @project.present? ? @project.id : nil})
    asset_data = get_asset_path(@asset)
    Spreadsheet.client_encoding = 'UTF-8'
    @book = Spreadsheet.open("#{Rails.root}/public#{asset_data}")
  end
  
  def get_workbook
    @asset = Asset.find_by_id(params["asset_id"])
    @project = @asset.project
    asset_data = get_asset_path(@asset)
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open("#{Rails.root}/public#{asset_data}")
    @sheet = book.worksheet params["workbook_index"].to_i
  end
  
  def web_service;end
  
  protected
  
  def get_asset_path(asset)
    asset_data = asset.data.to_s
    asset_data = asset_data.split("?")[0] if asset_data.include?("?")
    asset_data
  end 
end
