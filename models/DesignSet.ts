import { IDesignFile, IDesignZipfile, ISortable } from ".";

export interface IDesignSet extends ISortable {
  files: IDesignFile[]
  zipfile: IDesignZipfile
}