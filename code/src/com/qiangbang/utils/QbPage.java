package com.qiangbang.utils;

import java.util.List;

import com.jfinal.plugin.activerecord.Page;

public class QbPage {
	private List data;				// list result of this page
	private int status = 0;				// status
	private int recordsFiltered;				// recordsFiltered
	private int recordsTotal;				// recordsTotal
	
	public List getData() {
		return data;
	}

	public void setData(List data) {
		this.data = data;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public QbPage(Page page) {
		super();
		this.data = page.getList();
		this.recordsFiltered = page.getTotalRow();
		this.recordsTotal = page.getTotalRow();
	}
}
