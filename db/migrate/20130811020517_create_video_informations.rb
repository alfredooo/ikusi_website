class CreateVideoInformations < ActiveRecord::Migration
  def change
    create_table :video_informations do |t|
      t.string :title
      t.text :description
      t.string :src

      t.timestamps
    end
  end
end
