requirejs.config({ 
	paths: { 
		jquery: 'lib/jquery-1.11.3.min',
		artGallery: 'app/artGallery'
	}
});

requirejs(['jquery', 'artGallery'], function($, artGallery) { 
	var datas = [ 
		{ 
			img: '1.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '2.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '3.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '4.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '5.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '6.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '7.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '8.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '9.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '10.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '11.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '12.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '13.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '14.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '15.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '16.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '17.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '18.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '19.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '20.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '21.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '22.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		},
		{ 
			img: '23.jpg',
			title: '相片标题',
			des: '相片详细描述文字内容'
		}
	];
	//var rahmenWidth= $($('.rahmen')[0]).width();

	$('.artGallery').artGallery({
		datas: datas
	});
});