class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.integer :video_information

      t.timestamps
    end
  end
end
